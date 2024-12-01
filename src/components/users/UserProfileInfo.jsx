import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { app } from "../../firebase-config";

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const UserProfileInfo = () => {
  const [userprofile, setUserProfile] = useState("");
  const [localUser, setLocalUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutValue, setAboutValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserProfile(userData);
          setAboutValue(userData?.about || "");
          setUsernameValue(userData?.username || "");
        }
      });
    }
    const userData = localStorage.getItem("user");
    if (userData) {
      setLocalUser(JSON.parse(userData));
    }
  }, [user, db]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setAboutValue(userprofile?.about || "");
    setUsernameValue(userprofile?.username || "");
    setNewImage(null);
  };

  const handleSaveClick = async () => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    let imageUrl = userprofile?.imageUrl;

    try {
      // Handle Image Upload
      if (newImage) {
        setImageUploading(true);

        // Delete the old image
        if (imageUrl) {
          const oldImageRef = ref(storage, imageUrl);
          await deleteObject(oldImageRef);
        }

        // Upload the new image
        const storageRef = ref(
          storage,
          `profileImages/${user.uid}/${newImage.name}`
        );
        const snapshot = await uploadBytes(storageRef, newImage);
        imageUrl = await getDownloadURL(snapshot.ref);

        setImageUploading(false);
      }

      // Update Firestore
      await updateDoc(docRef, {
        about: aboutValue,
        username: usernameValue,
        imageUrl,
      });

      setUserProfile((prev) => ({
        ...prev,
        about: aboutValue,
        username: usernameValue,
        imageUrl,
      }));

      setIsEditing(false);
      setNewImage(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
      setImageUploading(false);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setNewImage(event.target.files[0]);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Avatar Section */}
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Avatar
                src={
                  newImage
                    ? URL.createObjectURL(newImage)
                    : userprofile?.imageUrl
                }
                alt={userprofile?.username}
                sx={{
                  width: 120,
                  height: 120,
                  border: "3px solid",
                  borderColor: "primary.main",
                  margin: "0 auto",
                }}
              />
              {isEditing && (
                <Box mt={2}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCamera />}
                  >
                    Upload
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>
              )}
            </Grid>

            {/* Text Section */}
            <Grid item xs={12} md={8}>
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                {!isEditing ? (
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      cursor: "pointer",
                      "&:hover": {
                        color: "primary.main",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={handleEditClick}
                  >
                    {userprofile?.username || "Click to edit username"}
                  </Typography>
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                    sx={{ mb: 2 }}
                    label="Username"
                  />
                )}

                {!isEditing ? (
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                    onClick={handleEditClick}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "primary.main",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {userprofile?.about ||
                      "No about information provided. Click to edit."}
                  </Typography>
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={aboutValue}
                    onChange={(e) => setAboutValue(e.target.value)}
                    sx={{ mb: 2 }}
                    label="About"
                  />
                )}

                {isEditing && (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveClick}
                      sx={{ mr: 2 }}
                      disabled={imageUploading}
                    >
                      {imageUploading ? "Uploading..." : "Save"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}

                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 0.5 }}
                >
                  <strong>Role:</strong> {userprofile?.role}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Sawmill:</strong> {localUser?.sawmillName || "N/A"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfileInfo;
