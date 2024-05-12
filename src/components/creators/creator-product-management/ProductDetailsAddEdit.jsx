import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Chip,
  DialogContent,
  TextField,
    Button,
    styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ProductDetailsAddEdit = ({
  title,
  description,
  imageFiles,
  setTitle,
  setDescription,
  setImageFiles,

  handleSubmit,
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
              Upload Image
              <VisuallyHiddenInput
                name="image1"
                onChange={handleImageChange}
                type="file"
              />
            </Button>
          </Grid>
          <Grid item xs={6}>
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

      {/* <form onSubmit={handleSubmit}> */}

      {/* <button type="submit">Save Product Info</button> */}
      {/* </form> */}
    </>
  );
};

export default ProductDetailsAddEdit;
