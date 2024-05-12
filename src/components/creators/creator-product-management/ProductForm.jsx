import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { app } from "../../../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import PostCreator from "./PostCreator";
import PostsList from "./PostsList";
import ProductDetailsAddEdit from "./ProductDetailsAddEdit";
import {
  Button,
  Grid,
  Dialog,
  Typography,
  Paper,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    previewUrl: null,
  });
  const [dialogContent, setDialogContent] = useState(null);

  const db = getFirestore(app);
  const { projectId } = useParams();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the user ID from the Firebase user object
        fetchProjectDetails(user.uid); // Fetch project details after setting the userId
      } else {
        setUserId(null);
        setTitle(""); // Clear title if no user is logged in
        setDescription(""); // Clear description if no user is logged in
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  // const fetchProjectDetails = async (uid) => {
  //   if (uid && projectId) {
  //     const projectDocRef = doc(
  //       db,
  //       `users/${uid}/detailedProjects/${projectId}`
  //     );
  //     try {
  //       const docSnap = await getDoc(projectDocRef);
  //       if (docSnap.exists()) {
  //         const projectData = docSnap.data();
  //         setTitle(projectData.title || "");
  //         setDescription(projectData.description || "");
  //       } else {
  //         console.log("No such project!");
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch project details: ", error);
  //     }
  //   }
  // };

  const fetchProjectDetails = async (uid) => {
    if (uid && projectId) {
      const projectDocRef = doc(db, `users/${uid}/detailedProjects/${projectId}`);
      try {
        const docSnap = await getDoc(projectDocRef);
        if (docSnap.exists()) {
          const projectData = docSnap.data();
          setTitle(projectData.title || "");
          setDescription(projectData.description || "");
          setImageFiles({ ...imageFiles, previewUrl: projectData.imageUrl || null }); // Set image URL if available
        } else {
          console.log("No such project!");
        }
      } catch (error) {
        console.error("Failed to fetch project details: ", error);
      }
    }
  };
  

  // const handleSubmit = async (event) => {
  //   event.preventDefault(); // Prevent the default form submit action
  //   if (!userId) {
  //     alert("No user logged in."); // Alert if no user ID is available
  //     return; // Stop the function if no user is logged in
  //   }

  //   // Define the Firestore document reference for the project details
  //   const projectDocRef = doc(
  //     db,
  //     `users/${userId}/detailedProjects/${projectId}`
  //   );

  //   try {
  //     // Attempt to set the document with title and description
  //     await setDoc(
  //       projectDocRef,
  //       {
  //         title,
  //         description,
  //       },
  //       { merge: true }
  //     ); // Use merge to avoid overwriting other fields that might exist

  //     // Notify the user of successful update
  //     alert("Product information created successfully.");
  //   } catch (error) {
  //     // Log any errors to the console and alert the user
  //     console.error("Error creating product info: ", error);
  //     alert("Failed to create product information.");
  //   }
  //   setOpenDialog(false);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId) {
      alert("No user logged in.");
      return;
    }
  
    let imageUrl = imageFiles.previewUrl; // Default to the current preview URL
  
    if (imageFiles.image1) {
      const storage = getStorage();
      const storageRef = ref(storage, `projectImages/${projectId}/${imageFiles.image1.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, imageFiles.image1);
        imageUrl = await getDownloadURL(snapshot.ref); // Update imageUrl with the new URL
      } catch (error) {
        console.error("Error uploading image: ", error);
        alert("Failed to upload new image.");
        return;
      }
    }
  
    const projectDocRef = doc(db, `users/${userId}/detailedProjects/${projectId}`);
    try {
      await setDoc(projectDocRef, { title, description, imageUrl }, { merge: true });
      alert("Product information updated successfully.");
    } catch (error) {
      console.error("Error updating product info: ", error);
      alert("Failed to update product information.");
    }
    setOpenDialog(false);
  };
  

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleAddPostClick = () => {
    setOpenAddPostDialog(true);
  };

  return (
    <>
      <Grid>
        <Grid item xs={12} p={2}>
          <Paper>
            <Grid item container xs={12}>
              <Grid item container xs={12} sm={6}>
                <Grid item xs={12} p={1}>
                  <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid item xs={12} p={1}>
                  {description}
                </Grid>
              </Grid>

              <Grid item container xs={12} sm={6}>
                <Grid item xs={12} p={2}>
                {imageFiles.previewUrl && (
      <img src={imageFiles.previewUrl} alt="Project Image" style={{ width: "auto", height: "200px" }} />
    )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid container justifyContent={"space-around"}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPostClick}
            >
              Add Diary Post
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog component to display edit product detials content */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <ProductDetailsAddEdit
            title={title}
            description={description}
            imageFiles={imageFiles}
            setTitle={setTitle}
            setDescription={setDescription}
            setImageFiles={setImageFiles}
            handleSubmit={handleSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog component to add edit posts content */}
      <Dialog
        open={openAddPostDialog}
        onClose={() => setOpenAddPostDialog(false)}
      >
        <DialogContent>
          <PostCreator db={db} userId={userId} projectId={projectId} />
        </DialogContent>
      </Dialog>

      <PostsList db={db} userId={userId} projectId={projectId} />
    </>
  );
};

export default ProductForm;
