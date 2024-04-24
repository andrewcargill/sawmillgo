import React from "react";
import { 
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Typography,

 } from "@mui/material";



const FilteredProjectsTable = ({ projects, title, openProjectModal, dynamicView }) => {
  return (
    <Grid container>
      {dynamicView === 'list' ? (
      <Grid item xs={12}>
        {/* <h2>{title}</h2> */}
        {projects.length > 0 ? (
          <Grid item container>
            <TableContainer component={Paper}>
              <Table aria-label="simple table" sx={{ minWidth: 450 }}>
                <TableHead>

                  <TableRow>
                    <TableCell
                      sx={{
                        position: "sticky",
                        left: 0,
                        background: "white",
                        zIndex: 1,
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Deadline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow
                      key={project.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      hover
                      onClick={() => openProjectModal(project, "view")}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          position: "sticky",
                          left: 0,
                          background: "white",
                          zIndex: 1,
                        }}
                      >
                        {project.projectName}
                      </TableCell>
                      <TableCell>{project.customerName}</TableCell>
                      <TableCell>{project.createdBy}</TableCell>
                      <TableCell>{project.date}</TableCell>
                      <TableCell>{project.deadline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <p>No projects found.</p>
        )}
      </Grid>
      ):(
        <Grid item xs={12}>
        {/* <h2>{title}</h2> */}
        {projects.length > 0 ? (
          <Grid item container>
           {projects.map((project) => (
              <Grid
                className="item-select"
                item
                xs={12}
                sm={6}
                lg={3}
                key={project.id}
                p={2}
                m={1}
                bgcolor="white.main"
                sx={{
                  border: "4px solid green",
                  
                  borderRadius: "5px",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => openProjectModal(project, "view")}
              >
                <Grid item>
                  <Typography variant="h6">{project.projectName}</Typography>
                  <Typography variant="body2">{project.creationDate}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No projects found.</p>
        )}
      </Grid>
      )}
    </Grid>
  );
};

export default FilteredProjectsTable;
