import React, { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase-config";
import { Button, Grid, TextField, styled } from "@mui/material";
import UserContext from "../../Contexts/UserContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpdateCreatorProfile = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [role, setRole] = useState("guest");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [sawmillId, setSawmillId] = useState("");
  const [image, setImage] = useState(null);
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    previewUrl: null, // State to store the image preview URL
  });

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    // Fetch existing user profile
    if (user) {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username || "");
          setAbout(userData.about || "");
          setRole(userData.role || "guest");
          setSawmillId(userData.sawmillId || "");
            setPortfolioUrl(userData.portfolioUrl || "");
        }
      });
    }
  }, [user, db]);

  useEffect(() => {
    console.log("image", image);
  }, [image]);

  //   const handleImageChange = (e) => {
  //     if (e.target.files[0]) {
  //       setImage(e.target.files[0]);
  //     }
  //   };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      // Create a URL for the image file
      const previewUrl = URL.createObjectURL(file);

      setImageFiles({
        image1: file,
        previewUrl, // Set the preview URL in the state
      });
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure there's a user before attempting to save the profile
    if (!user) {
      alert("No user is currently signed in.");
      return;
    }

    // Handle image upload if an image has been selected
    if (imageFiles.image1) {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        `profileImages/${user.uid}/${imageFiles.image1.name}`
      );

      try {
        const snapshot = await uploadBytes(storageRef, imageFiles.image1);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Uploaded a blob or file!", downloadURL);

        // Proceed to update the user's profile with the new image URL
        const userProfile = {
          userId: user.uid,
          username,
          about,
          role,

          imageUrl: downloadURL, // Add the download URL to the user's profile
        };

        await setDoc(doc(db, "users", user.uid), userProfile, { merge: true });

        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error uploading image: ", error);
        alert("Error updating profile.");
        return;
      }
    } else {
      // Proceed without image upload if no image is selected
      const userProfile = {
        userId: user.uid,
        username,
        about,
        role,
        sawmillId,
        portfolioUrl,
      };

      try {
        await setDoc(doc(db, "users", user.uid), userProfile, { merge: true });
        alert("Profile updated successfully!");

        // Update local storage with the new username
        let userLocalStorage = JSON.parse(localStorage.getItem("user"));
        if (userLocalStorage) {
          userLocalStorage.displayName = username;
          localStorage.setItem("user", JSON.stringify(userLocalStorage)); // Save back to localStorage
        }
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert("Error updating profile.");
      }
    }
  };

  return (
    <Grid Container xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <h2>Update User Profile</h2>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="about"
            type="text"
            name="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            multiline={true}
            rows={4}
          />
        </Grid>
        <Grid
          container
          item
          p={1}
          xs={12}
          sm={12}
          alignContent={"center"}
          justifyContent={"space-around"}
        >
          <Grid p={1}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Image1
              <VisuallyHiddenInput
                name="image1"
                onChange={handleImageChange}
                type="file"
              />
            </Button>
            {/* <Grid>
              {imageFiles.image1 && <Grid>{imageFiles.image1.name}</Grid>}
            </Grid> */}
            <Grid>
              {imageFiles.image1 && (
                <>
                  <Grid>{imageFiles.image1.name}</Grid>
                  <img
                    src={imageFiles.previewUrl}
                    alt="Preview"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="url"
            variant="outlined"
            label="portfolioUrl"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
          />
        </Grid>

        {/* <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            About:
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>
        </div> */}
        <div>
          <label>
            Role:
            <select
              disabled
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="guest">Guest</option>
              <option value="operator">Operator</option>
              <option value="admin">Admin</option>
              <option value="siteadmin">SiteAdmin</option>
              <option value="creator">Creator</option>
              {/* Add other roles as needed */}
            </select>
          </label>
        </div>
        <div>
          <label>
            Image:
            <input type="file" onChange={handleImageChange} />
          </label>
        </div>

        <div>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </Grid>
  );
};

export default UpdateCreatorProfile;
