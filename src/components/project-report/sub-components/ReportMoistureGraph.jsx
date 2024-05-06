import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const ReportMoistureGraph = ({ plankData }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        plankData && setData(plankData);
        console.log(plankData);
    }
    , [plankData]);

   


    return (
        <Grid container justifyContent="center">
        <Paper style={{ width: "100%" }}>
          
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={plankData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" />
              <YAxis dataKey="value" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>


    );
    };

export default ReportMoistureGraph;