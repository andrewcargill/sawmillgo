import React from "react";
import { Grid, Typography } from "@mui/material";

const TreesBasicView = ({ trees, onTreeClick }) => (
  <Grid container spacing={2}>
    {trees.map((tree) => (
      <Grid
        item
        xs={3}
        key={tree.id}
        onClick={() => onTreeClick(tree)}
        sx={{
          cursor: "pointer",
          "&:hover": { backgroundColor: "primary.light" },
          border: "1px solid lightgrey",
          padding: 2,
        }}
      >
        <Typography variant="h6">{tree.refId}</Typography>
        <Typography variant="body2">{tree.speciesName}</Typography>
      </Grid>
    ))}
  </Grid>
);

export default TreesBasicView;

