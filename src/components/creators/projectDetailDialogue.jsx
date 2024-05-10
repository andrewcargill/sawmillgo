import { Grid } from "@mui/material";
import React from "react";


const ProjectDetailDialogue = ({ data }) => {
    return (
        <Grid>
            <h1>Project Details</h1>
            <h2>Project Name: {data.projectName}</h2>
            <h2>Notes: {data.notes}</h2>
            <h2>Customer Name: {data.customerName}</h2>
            <h2>Project Status: {data.status}</h2>
            <h2>Start Date: {data.date}</h2>
            <h2>Deadline: {data.deadline}</h2>
            <h2>Verified: {data.verified ? 'Yes': 'No'}</h2>
            <h2>Project Sawmill Name: {data.sawmillName}</h2>
        </Grid>
    );
}


export default ProjectDetailDialogue;