import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../../firebase-config';
import { CardContent, Typography, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LogsWidget = () => {
  const [logsData, setLogsData] = useState([]);
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchLogs = async () => {
      if (!sawmillId) {
        console.log("Sawmill ID not found. Cannot fetch logs.");
        return;
      }

      const q = query(
        collection(db, `sawmill/${sawmillId}/logs`),
        where("planked", "==", false)
      );
      const snapshot = await getDocs(q);
      const logsList = snapshot.docs.map((doc) => doc.data());

      const speciesCount = logsList.reduce((acc, log) => {
        const species = log.speciesName;
        const verifiedStatus = log.verified ? 'verified' : 'standard';
        
        if (!acc[species]) {
          acc[species] = { verified: 0, standard: 0 };
        }
        acc[species][verifiedStatus] += 1;
        return acc;
      }, {});

      const data = Object.keys(speciesCount).map((species) => ({
        name: species,
        verified: speciesCount[species].verified,
        standard: speciesCount[species].standard,
      }));

      setLogsData(data);
    };

    fetchLogs();
  }, [sawmillId, db]);

  return (
    <Grid container style={{ height: 150 }}>
      <CardContent style={{ width: '100%' }}>
        <Typography variant="body2" align='left' gutterBottom>
          Total available logs
        </Typography>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={logsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="verified" fill="#24211e" />
            <Bar dataKey="standard" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Grid>
  );
};

export default LogsWidget;
