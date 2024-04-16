import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "../../firebase-config"; // Correct the import path as necessary
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const ListAllPlanks = () => {
  const [planks, setPlanks] = useState([]);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const navigate = useNavigate();

  const fetchPlanks = async () => {
    if (!sawmillId) {
      console.log("Sawmill ID not found. Cannot fetch planks.");
      return;
    }

    let q = query(
      collection(db, `sawmill/${sawmillId}/planks`),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const planksList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPlanks(planksList);
    console.log("Fetched planks: ", planksList);
  };

  useEffect(() => {
    fetchPlanks();
  }, [sawmillId]); // Fetch planks when component mounts and sawmillId changes

  const handleAddPlankClick = () => {
    navigate("/addplank");
  };

  const refreshPlankList = () => {
    fetchPlanks();
  };

  const handlePlankClick = (plankId) => {
    return () => {
      navigate(`/plank/${plankId}`);
    };
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid container item xs={12}>
        <Grid xs={6} sm={10} container item justifyContent={"start"}>
          <Typography variant="h4" color="initial">
            Planks
          </Typography>
        </Grid>
        <Grid container item xs={6} sm={2} justifyContent={"end"}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddPlankClick}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        Last added plank: {planks.length > 0 ? planks[0].refId : "No planks available"}
      </Grid>

      <Grid
        container
        sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        alignContent={"center"}
      >
        {planks.length > 0 ? (
          planks.map((plank) => (
            <Grid
              className="item-select"
              item
              container
              xs={3}
              sm={2}
              lg={2}
              key={plank.id}
              m={1}
              bgcolor={"white.main"}
              style={{
                border: plank.verified ? "4px solid green" : "2px solid lightgrey",
                borderRadius: "5px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handlePlankClick(plank.id)}
            >
              <Grid item>
                <h3>{plank.refId}</h3>
              </Grid>
              <Grid item>
                <p>{plank.date}</p>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No planks found.</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ListAllPlanks;
