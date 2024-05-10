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
import CountrySelect from "../country-components/CountrySelect";

const UpdateCreatorProfile = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [role, setRole] = useState("guest");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [sawmillId, setSawmillId] = useState("");
  const [socialMediaUrl1, setSocialMediaUrl1] = useState("");
    const [socialMediaUrl2, setSocialMediaUrl2] = useState("");
    const [country, setCountry] = useState("");
    const [companyName, setCompanyName] = useState("");
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
        setSocialMediaUrl1(userData.socialMediaUrl1 || "");
        setSocialMediaUrl2(userData.socialMediaUrl2 || "");
        setCountry(userData.country || "");
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
        socialMediaUrl1,
        socialMediaUrl2,
        country,
        companyName,
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

 
    <Grid container item xs={12} spacing={2}>
  
        <Grid item xs={12}>
          <h2>Update User Profile</h2>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        <CountrySelect country={country} setCountry={setCountry} />
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
          <Grid item p={1}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              color="secondary"
              startIcon={<CloudUploadIcon />}
            >
              Upload Image1
              <VisuallyHiddenInput
                name="image1"
                onChange={handleImageChange}
                type="file"
              />
            </Button>
      
            <Grid item p={2}>
              {imageFiles.image1 && (
                <>
                 
                  <img
                    src={imageFiles.previewUrl}
                    alt="Preview"
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="url"
            variant="outlined"
            label="Portfolio URL"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="url"
            variant="outlined"
            label="Social Media URL 1"
            value={socialMediaUrl1}
            onChange={(e) => setSocialMediaUrl1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="url"
            variant="outlined"
            label="Social Media URL 2"
            value={socialMediaUrl2}
            onChange={(e) => setSocialMediaUrl2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" type="submit" onClick={handleSubmit} >Update Profile</Button>
        </Grid>
    </Grid>

  );
};

export default UpdateCreatorProfile;
