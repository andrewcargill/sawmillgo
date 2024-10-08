import React from "react";
import {
  Grid,
  Typography,
  Chip,
  TextField,
  Button,
  styled,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ProductDetailsAddEdit = ({
  title,
  description,
  imageFiles,
  imageTitle,
  imageDescription,
  setTitle,
  setDescription,
  setImageFiles,
  setImageTitle,
  setImageDescription,

}) => {
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

  return (
    <>
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
              Update Product Details
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
            fullWidth
            type="text"
            variant="outlined"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField
            fullWidth
            label="Description"
            type="text"
            name="postDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline={true}
            rows={2}
            required
          />
        </Grid>
        <Grid xs={12} mb={2}>
          <Paper>
            <Grid container xs={12} p={2}>
              <Typography variant="h6" color={"secondary"}>
                Product Image
              </Typography>
            </Grid>
            <Grid container xs={12} mb={2} p={2}>
              <Grid item container xs={12} sm={6}>
                <Grid item xs={12} mb={2}>
                  <Button
                    fullWidth
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    color="secondary"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <VisuallyHiddenInput
                      name="image1"
                      onChange={handleImageChange}
                      type="file"
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <TextField
                    fullWidth
                    type="text"
                    variant="outlined"
                    label="Title"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} mb={1}>
                  <TextField
                    fullWidth
                    type="text"
                    variant="outlined"
                    label="Description"
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
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
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetailsAddEdit;
