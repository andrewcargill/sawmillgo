import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

const ProjectDetailDialogue = ({ data }) => {

    const navigate = useNavigate();

    useEffect(() => {
    console.log("ProjectDetailDialogue data: ", data);
    }, [data]);
    
    const handleOpenProductConsole = () => {
        navigate(`/product/${data.id}`);
    }
  
  return (
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
            {data?.projectName}
          </Typography>
        </Grid>
        <Grid container item xs={4} justifyContent={"end"}>
          <Chip
            size="small"
            color="secondary"
            style={{ textTransform: "capitalize" }}
            label={data.status}
          />
     
        </Grid>
        <Grid item xs={12} pb={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
               
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Created By
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
                    {data.createdBy}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Creator
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
                    {data.creatorId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Customer
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
                    {data.customerName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Info
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
                    {data.projectInfo}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Notes
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>{data.notes}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Date Started
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>{data.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Deadline
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>{data.deadline}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Grid container item xs={12} p={1}>
              <Typography
                id="tree-details-title"
                variant="body2"
                component="h2"
                style={{ textTransform: "capitalize" }}
              >
                allocated stock
              </Typography>
            </Grid>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    TREES
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>LOGS</TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>PLANKS</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    {data?.treeRefIds &&
                      data?.treeRefIds.map((tree) => (
                        <div>
                          <Chip
                            key={tree}
                            // icon={<TagFacesIcon />}
                            label={tree}
                            variant="outlined"
                            color="dark"
                            size="small"
                          />
                        </div>
                      ))}
                  </TableCell>

                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    {data?.logRefIds &&
                      data?.logRefIds.map((log) => (
                        <div>
                          <Chip
                            key={log}
                            // icon={<TagFacesIcon />}
                            label={log}
                            variant="outlined"
                            color="dark"
                            size="small"
                          />
                        </div>
                      ))}
                  </TableCell>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    {data?.plankRefIds &&
                      data?.plankRefIds.map((plank) => (
                        <div>
                          <Chip
                            key={plank}
                            // icon={<TagFacesIcon />}
                            label={plank}
                            variant="outlined"
                            color="dark"
                            size="small"
                          />
                        </div>
                      ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container item xs={12} pt={2}>
          {data.status === "withCreator" && (
    <Button  fullWidth variant="contained" onClick={handleOpenProductConsole}>Product Console</Button>
)}
    </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectDetailDialogue;
