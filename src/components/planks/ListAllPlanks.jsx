import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "../../firebase-config"; // Correct the import path as necessary
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PlankListContent from "./sub-components/PlankListContent";
import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';

const ListAllPlanks = () => {
  const [planks, setPlanks] = useState([]);
  const [dynamicView, setDynamicView] = useState('dynamic');

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const navigate = useNavigate();

  const views = [
    { view: 'dynamic', icon: <AppsIcon />},
    { view: 'basic', icon:  <GridOnIcon /> },
    { view: 'list', icon: <ListIcon /> }
  ];

  const handleDynamicViewClick = () => {
    // Find the index of the current view
    const currentIndex = views.findIndex(v => v.view === dynamicView);
    // Calculate the next index, cycling back to 0 if at the end
    const nextIndex = (currentIndex + 1) % views.length;
    // Update the state to the next view
    setDynamicView(views[nextIndex].view);
  };

  // Get the current icon based on the dynamicView
  const currentIcon = views.find(v => v.view === dynamicView)?.icon;

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



  const handlePlankClick = (plankId) => {
    return () => {
      navigate(`/plank/${plankId}`);
    };
  };

  // const handleDynamicViewClick = () => {
  //   setDynamicView((prev) => !prev);
  // }

  function renderPlankView(plank, view) {
    switch (view) {
      case 'dynamic':
        return (
          <Grid
            key={plank.id}
            onClick={() => handlePlankClick(plank.id)}
          >
            <PlankListContent data={plank} />
          </Grid>
        );
      case 'basic':
        return (
          <Grid
            className="item-select"
            item
            container
            xs={3}
            sm={2}
            lg={2}
            key={plank.id}
            m={1}
            bgcolor="white.main"
            sx={{
              border: plank.verified ? "4px solid green" : "2px solid lightgrey",
              borderRadius: "5px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handlePlankClick(plank.id)}
          >
            <Grid item>
              <h3>{plank.refId}</h3>
            </Grid>
            <Grid item>
              <p>{plank.speciesName}</p>
            </Grid>
          </Grid>
        );
      case 'list':
        return (
          <Grid
            key={plank.id}
            container
            spacing={2}
            sx={{
              padding: "8px",
              border: "1px solid lightgrey",
              borderRadius: "4px",
              backgroundColor: "white",
              margin: "4px",
              cursor: "pointer",
            }}
            onClick={() => handlePlankClick(plank.id)}
          >
            <Grid item xs={12}>
              <Typography variant="h6">{plank.refId}</Typography>
              <Typography variant="body2">{plank.speciesName}</Typography>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  }




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
      onClick={handleDynamicViewClick}
    >
      {currentIcon}
    </Button>
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
          alignContent="center"
        >
          {planks.length > 0 ? (
            planks.map((plank) => (
              renderPlankView(plank, dynamicView)
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
