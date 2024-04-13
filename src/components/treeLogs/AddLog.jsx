import React, { useState } from "react";
import { Input } from "@mui/icons-material";
import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
import LogWithoutTree from "./sub-conponents/LogWithoutTree";

const AddLog = () => {
    const [withTree, setWithTree] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const logData = {
        treeId: null,
        date: '',
        species: '',
        diameter: 0,
        length: 0,
        lumberjackUid: '',
        lumberjackName: '',
        status: 'available',
        locationId: '',
        locationName: '',
        planked: false,
        projectId: null,
        projectName: '',
        verified: false,

    };
        

    const handleClickTreeChoice = (choice) => () => {
        setWithTree(choice);
        setShowForm(true);
    };

    return (
        <div>
            
            <Grid spacing={1}>
              
           
            <h1>Add Log</h1>
            {showForm ? ('') : (
            <Grid>
       
            <Typography variant="h6">Log form tree?</Typography>
            <button onClick={handleClickTreeChoice(true)}>Yes</button>
            <button onClick={handleClickTreeChoice(false)}>No</button>
            </Grid>
        )}
            </Grid>
        

            {showForm ? (
                withTree ? (
                    // Add tree id
                  <Grid bgcolor={'primary.main'}>
                        <h4>With Tree</h4>
                        <Grid>
                           <TextField label='tree id' />
                        </Grid>
                        </Grid>

                ) : (
                   <LogWithoutTree />
                )
                
            ) : (
                <div>No selection made</div>
            )}

            <Grid>
                Standard Items for component
            </Grid>
        </div>
    );
};

export default AddLog;
