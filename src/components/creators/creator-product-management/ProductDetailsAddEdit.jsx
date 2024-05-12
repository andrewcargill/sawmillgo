import React, { useEffect } from "react";
import { Grid, Typography, Chip, DialogContent } from "@mui/material";


const ProductDetailsAddEdit = ({ title , description, setTitle, setDescription, handleSubmit }) => {


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
        </Grid>
        
        {/* <form onSubmit={handleSubmit}> */}
            <label>
                Product Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            {/* <button type="submit">Save Product Info</button> */}
        {/* </form> */}
       </>
    );
    };

export default ProductDetailsAddEdit;