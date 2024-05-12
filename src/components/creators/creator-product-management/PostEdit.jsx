import React, { useEffect, useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import {
  DialogContent,
  Grid,
  Typography,
  Chip,
  Button,
  TextField,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostEdit = ({ db, userId, projectId, post, handleClose }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postDate, setPostDate] = useState("");
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    previewUrl: null,
  });

  useEffect(() => {
    if (post) {
      setPostTitle(post.title);
      setPostDescription(post.description);
      setPostImage(post.image);
      setPostDate(post.date);
      
      setImageFiles({
        image1: null,
        previewUrl: post.image || null,
      });
    }
  }, [post]);

  // const handlePostSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!userId || !projectId) {
  //     alert("Missing user or project ID.");
  //     return;
  //   }

  //   // Update logic here
  //   const postDocRef = doc(
  //     db,
  //     `users/${userId}/detailedProjects/${projectId}/posts`,
  //     post.id
  //   );
  //   const updatedData = {
  //     title: postTitle,
  //     description: postDescription,
  //     // Handle image update separately if needed
  //     date: postDate,
  //   };

  //   try {
  //     await updateDoc(postDocRef, updatedData);
  //     alert("Post updated successfully!");
  //     // Additional cleanup as needed
  //   } catch (error) {
  //     console.error("Error updating post: ", error);
  //     alert("Failed to update post.");
  //   }

  //   handleClose(); // Close the dialog after submission
  // };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (!userId || !projectId) {
      alert("Missing user or project ID.");
      return;
    }
  
    let imageUrl = postImage; // Use the existing image URL by default
  
    if (imageFiles.image1) {
      // Proceed with the upload if a new image is selected
      const storage = getStorage();
      const uniqueName = `${imageFiles.image1.name.split('.')[0]}_${Date.now()}.${imageFiles.image1.name.split('.').pop()}`;
      const imageRef = ref(storage, `projectImages/${projectId}/${uniqueName}`);
  
      try {
        const snapshot = await uploadBytes(imageRef, imageFiles.image1);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading new image: ", error);
        alert("Failed to upload new image.");
        return;
      }
    }
  
    const postDocRef = doc(db, `users/${userId}/detailedProjects/${projectId}/posts`, post.id);
    const updatedData = {
      title: postTitle,
      description: postDescription,
      image: imageUrl,
      date: postDate,
    };
  
    try {
      await updateDoc(postDocRef, updatedData);
      alert("Post updated successfully!");
      handleClose();  // Close the dialog
    } catch (error) {
      console.error("Error updating post: ", error);
      alert("Failed to update post.");
    }
  };
  

  // Remainder of the component code

  /* Image button hidden content */
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

  /* Handle Image file upload and preview */
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      // Create a URL for the image file
      const previewUrl = URL.createObjectURL(file);

      setImageFiles({
        image1: file,
        previewUrl,
      });
    }
  };

  return (
    <DialogContent>
      <Grid container>
        <Grid container item xs={12} mb={2}>
          <Grid item xs={8}>
            <Typography
              id="tree-details-title"
              variant="h6"
              component="h2"
              color={"primary"}
              style={{ textTransform: "capitalize" }}
            >
              Add New Post
            </Typography>
          </Grid>
          <Grid container item xs={4} justifyContent={"end"}>
            <Chip
              size="small"
              color="secondary"
              style={{ textTransform: "capitalize" }}
              label={"Active"}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField
            label="Date"
            type="date"
            name="date"
            InputLabelProps={{ shrink: true }}
            value={postDate.date}
            onChange={(e) => setPostDate(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField
            fullWidth
            label="Description"
            type="text"
            name="postDescription"
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            multiline={true}
            rows={2}
            required
          />
        </Grid>
        <Grid item container xs={12} mb={2}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
            {imageFiles.previewUrl && (
              <>
                <img
                  src={imageFiles.previewUrl}
                  alt="Preview"
                  style={{ maxWidth: "auto", height: "100px" }}
                />
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handlePostSubmit}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </DialogContent>
  );
};

export default PostEdit;
