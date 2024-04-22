import React from "react";
import { 
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper

 } from "@mui/material";


const FilteredProjectsTable = ({ projects, title, openProjectModal }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>{title}</h2>
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
    </Grid>
  );
};

export default FilteredProjectsTable;
