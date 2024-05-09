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
import { Grid } from "@mui/material";
import UserContext from "../../Contexts/UserContext";

const UserProfileForm = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [role, setRole] = useState("guest"); // Default to 'guest'
  const [sawmillId, setSawmillId] = useState("");
  const [image, setImage] = useState(null);

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
        }
      });
    }
  }, [user, db]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure there's a user before attempting to save the profile
    if (!user) {
      alert("No user is currently signed in.");
      return;
    }

    // Handle image upload if an image has been selected
    if (image) {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        `profileImages/${user.uid}/${image.name}`
      );
      try {
        const snapshot = await uploadBytes(storageRef, image);
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
        //imageUrl: previousImageUrl, // Optionally handle keeping the previous image URL if needed
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
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <h2>Update User Profile</h2>
        <div>
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
        </div>
        <div>
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
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

export default UserProfileForm;
