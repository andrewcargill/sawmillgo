import React from "react";
import { Grid } from "@mui/material";

const FilteredProjectsTable = ({ projects, title, openProjectModal }) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <h2>{title}</h2>
                {projects.length > 0 ? (
                    <Grid item container>
                        {projects.map((project) => (
                            <Grid
                                item
                                xs={12}
                                m={1}
                                p={1}
                                key={project.id}
                                border={"2px solid lightgrey"}
                                onClick={() => openProjectModal(project, "view")}
                                style={{ cursor: "pointer" }}
                            >
                                <strong>{project.projectName}</strong>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <p>No projects found.</p>
                )}
            </Grid>
        </Grid>
    );
}

export default FilteredProjectsTable;
