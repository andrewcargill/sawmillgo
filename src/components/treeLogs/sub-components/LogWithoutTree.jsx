import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const LogWithoutTree = () => {
    const [formData, setFormData] = useState({
        date: '',
        lumberjackUid: '',
        status: 'available'
    });

    const handleChange = (prop) => (event) => {
        setFormData({ ...formData, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        // Handle form submission logic here
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.date}
                    onChange={handleChange('date')}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Lumberjack UID"
                    value={formData.lumberjackUid}
                    onChange={handleChange('lumberjackUid')}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export default LogWithoutTree;
