import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { app } from "../../firebase-config";
import { Paper, Grid, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PlankMoistureCheckGraph = () => {
  const { plankId } = useParams();
  const db = getFirestore(app);
  const [data, setData] = useState([]);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchData = async () => {
      const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
      const q = query(collection(db, `sawmill/${sawmillId}/planks/${plankId}/moistureChecks`));
      const querySnapshot = await getDocs(q);
      const moistureData = querySnapshot.docs.map(doc => ({
        date: doc.data().date,
        moistureContent: doc.data().moistureContent,
      }));
      setData(moistureData);
    };

    fetchData();
  }, [db, plankId]);

  return (
    <Grid container justifyContent="center" p={2}>
      <Paper style={{ width: "100%", padding: 20 }}>
        <Typography variant="h6">Moisture Check Graph</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="moistureContent" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
};

export default PlankMoistureCheckGraph;
