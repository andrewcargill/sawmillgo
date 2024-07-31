import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../../firebase-config';
import { CardContent, Typography, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TreesWidget = () => {
  const [treesData, setTreesData] = useState([]);
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchTrees = async () => {
      if (!sawmillId) {
        console.log("Sawmill ID not found. Cannot fetch trees.");
        return;
      }

      const q = query(
        collection(db, `sawmill/${sawmillId}/trees`),
        where("logged", "==", false)
      );
      const snapshot = await getDocs(q);
      const treesList = snapshot.docs.map((doc) => doc.data());

      const speciesCount = treesList.reduce((acc, tree) => {
        acc[tree.speciesName] = (acc[tree.speciesName] || 0) + 1;
        return acc;
      }, {});

      const data = Object.keys(speciesCount).map((species) => ({
        name: species,
        count: speciesCount[species],
      }));

      setTreesData(data);
    };

    fetchTrees();
  }, [sawmillId, db]);

  return (
    <Grid container style={{ height: 150 }}>
      <CardContent style={{ width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Trees
        </Typography>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={treesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#24211e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Grid>
  );
};

export default TreesWidget;
