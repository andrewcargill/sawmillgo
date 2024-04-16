import React, { useState } from "react";
import { Typography, Grid, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import CustomTypography from "../../../components/typography/CustomTypography";


const PlankListRows = ({ data }) => {
  const navigate = useNavigate();

  const wholeLength = Math.floor(data.length);
  const wholeDepth = Math.floor(data.depth);
  const wholeWidth = Math.floor(data.width);

  const calculateWidthPercentage = (width) => {
    const minWidth = 2;
    const maxWidth = 25;
    const minPercentage = 40;
    const maxPercentage = 190;

    if (width <= minWidth) return `${minPercentage}px`;
    if (width >= maxWidth) return `${maxPercentage}px`;

    const percentage =
      minPercentage +
      ((width - minWidth) / (maxWidth - minWidth)) *
        (maxPercentage - minPercentage);
    return `${percentage}px`;
  };

  const calculateHeight = (depth) => {
    const minDepth = 2;
    const maxDepth = 25;
    const minHeight = 40;
    const maxHeight = 190;

    if (depth <= minDepth) return `${minHeight}px`;
    if (depth >= maxDepth) return `${maxHeight}px`;

    const height =
      minHeight +
      ((depth - minDepth) / (maxDepth - minDepth)) * (maxHeight - minHeight);
    return `${height}px`;
  };

  const toolTipContent = (
    <>
      <Typography variant="body1">
        L={wholeLength} | W={wholeWidth} | D={wholeDepth}
      </Typography>
    </>
  );

  const handlePlankClick = () => {
    navigate(`/plank/${data.id}`);
  };

  return (
    <Tooltip title={toolTipContent} arrow>
      <Grid
        className="item-select"
        item
        container
        bgcolor={ data.verified ?  "secondary.main" : "lightgrey"}
        m={3}
        p={0}
        borderRadius={"5px"}
        pt={0}
        pl={0}
        justifyContent={"center"}
        alignContent={"center"}
        sx={{
          width: calculateWidthPercentage(data.width),
          height: calculateHeight(data.depth),
          cursor: "pointer",
        }}

      >
        <Grid xs={12} fontWeight={700} >
        
         {data.refId}
        
        </Grid>
        <Grid xs={12}>
        {data.speciesName} 
        </Grid>
       
      </Grid>
    </Tooltip>
  );
};

export default PlankListRows;
