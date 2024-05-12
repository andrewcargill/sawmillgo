import React, { useState, useEffect } from "react";
import {
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
  Box,
  IconButton,
  DialogTitle,
} from "@mui/material";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import InfoIcon from "@mui/icons-material/Info";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    previewUrl: null,
  });
  const [dialogContent, setDialogContent] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);

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

  const fetchProjectDetails = async (uid) => {
    if (uid && projectId) {
      const projectDocRef = doc(
        db,
        `users/${uid}/detailedProjects/${projectId}`
      );
      try {
        const docSnap = await getDoc(projectDocRef);
        if (docSnap.exists()) {
          const projectData = docSnap.data();
          setTitle(projectData.title || "");
          setDescription(projectData.description || "");
          setImageDescription(projectData.imageDescription || "");
          setImageTitle(projectData.imageTitle || "");
          setImageFiles({
            ...imageFiles,
            previewUrl: projectData.imageUrl || null,
          }); // Set image URL if available
        } else {
          console.log("No such project!");
        }
      } catch (error) {
        console.error("Failed to fetch project details: ", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId) {
      alert("No user logged in.");
      return;
    }

    let imageUrl = imageFiles.previewUrl; // Default to the current preview URL

    if (imageFiles.image1) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `projectImages/${projectId}/${imageFiles.image1.name}`
      );
      try {
        const snapshot = await uploadBytes(storageRef, imageFiles.image1);
        imageUrl = await getDownloadURL(snapshot.ref); // Update imageUrl with the new URL
      } catch (error) {
        console.error("Error uploading image: ", error);
        alert("Failed to upload new image.");
        return;
      }
    }

    const projectDocRef = doc(
      db,
      `users/${userId}/detailedProjects/${projectId}`
    );
    try {
      await setDoc(
        projectDocRef,
        { title, description, imageDescription, imageTitle, imageUrl },
        { merge: true }
      );
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

  const handleImageInfoClick = () => {
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  return (
    <>
      <Grid bgcolor={"secondary.main"} borderRadius={3}>
      <Grid container justifyContent={"space-around"}  pt={2}>
          <Grid item xs={12} sm={6} p={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Edit Product Infomation
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} p={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPostClick}
            >
              Add Diary Post
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} p={2}>
          <Paper>
            <Grid item container xs={12}>
              <Grid item container xs={12} sm={6}>
                <Grid item xs={12} p={1}>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    {title}
                  </Typography>
                </Grid>
                <Grid item xs={12} p={1}>
                  <Typography
                    sx={{
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    {description}
                  </Typography>
                </Grid>
              </Grid>

              {/* <Grid item container xs={12} sm={6}>
                <Grid item xs={12} p={2}>
                  {imageFiles.previewUrl && (
                    <img
                      src={imageFiles.previewUrl}
                      alt="Project Image"
                      style={{ width: "auto", height: "200px" }}
                    />
                  )}
                </Grid>
              </Grid> */}

              <Grid item container xs={12} sm={6} position="relative" p={1}>
                <Box
                  position="relative"
                  width="100%"
                  height="auto"
                  border={"solid 1px lightgrey"}
                >
                  {imageFiles.previewUrl && (
                    <img
                      src={imageFiles.previewUrl}
                      alt="Project Image"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                  <IconButton
                    onClick={handleImageInfoClick}
                    size="small"
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                      color: "orange",
                      backgroundColor: "",
                      margin: 4,
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        

        
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
            imageTitle={imageTitle}
            setImageTitle={setImageTitle}
            imageDescription={imageDescription}
            setImageDescription={setImageDescription}
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

      {/* Dialog component to display image info */}
      <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
        <DialogTitle>{imageTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{imageDescription}</Typography>
          {/* Example image */}
          <Box
            component="img"
            sx={{
              // height: auto,
              // width: 350,
              // maxHeight: { xs: 233, md: 167 },
              
              maxWidth: { xs: 300, md: 600 },
            }}
            alt="Hero Image"
            src={imageFiles.previewUrl}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <PostsList db={db} userId={userId} projectId={projectId} />
    </>
  );
};

export default ProductForm;
