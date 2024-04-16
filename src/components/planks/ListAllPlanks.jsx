import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "../../firebase-config";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PlankListContent from "./sub-components/PlankListContent";
import AppsIcon from '@mui/icons-material/Apps';
import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';
import ListIcon from '@mui/icons-material/List';
import { Table, TableHead, TableRow, TableCell, TableContainer, Paper, TableBody } from "@mui/material";


const ListAllPlanks = () => {
  const [planks, setPlanks] = useState([]);
  const [dynamicView, setDynamicView] = useState('dynamic');
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const navigate = useNavigate();

  const views = [
    { view: 'dynamic', icon: <AppsIcon /> },
    { view: 'basic', icon: <GridOnIcon /> },
    { view: 'list', icon: <ListIcon /> }
  ];

  const handleDynamicViewClick = () => {
    const currentIndex = views.findIndex(v => v.view === dynamicView);
    const nextIndex = (currentIndex + 1) % views.length;
    setDynamicView(views[nextIndex].view);
  };

  const fetchPlanks = async () => {
    if (!sawmillId) {
      console.log("Sawmill ID not found. Cannot fetch planks.");
      return;
    }

    const q = query(
      collection(db, `sawmill/${sawmillId}/planks`),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const planksList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPlanks(planksList);
  };

  useEffect(() => {
    fetchPlanks();
  }, [sawmillId]);

  const handleAddPlankClick = () => {
    navigate("/addplank");
  };

  const handlePlankClick = plankId => () => {
    navigate(`/plank/${plankId}`);
  };

  function renderPlankView(view) {
    switch (view) {
      case 'dynamic':
        return( 
          
          <Grid container >
          {planks.map(plank => (
          
            <Grid 
            onClick={handlePlankClick(plank.id)}
            >
         
            <PlankListContent data={plank} />
            </Grid>
       
        ))}
        </Grid>
      );
      case 'basic':
        return (
        <Grid container >
        {planks.map(plank => (
          <Grid
            className="item-select"
            item
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
            onClick={handlePlankClick(plank.id)}
          >
            <Grid item>
              <Typography variant="h6">{plank.refId}</Typography>
              <Typography variant="body2">{plank.speciesName}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      );
      case 'list':
        return (
          <TableContainer component={Paper}>
          <Table aria-label="simple table" sx={{ minWidth: 800 }} >
            <TableHead>
              <TableRow>
                <TableCell>Ref ID</TableCell>
                <TableCell>Quality</TableCell>
                <TableCell>Species</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Width</TableCell>
                <TableCell>Depth</TableCell>
                <TableCell>Length</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Project</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planks.map((plank) => (
                <TableRow
                  key={plank.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  onClick={handlePlankClick(plank.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {plank.refId}
                  </TableCell>
                  <TableCell>{plank.verified ? 'verified' : 'standard'}</TableCell>
                  <TableCell>{plank.speciesName}</TableCell>
                  <TableCell>{plank.status}</TableCell>
                  <TableCell>{plank.grade}</TableCell>
                  <TableCell>{plank.width}</TableCell>
                  <TableCell>{plank.depth}</TableCell>
                  <TableCell>{plank.length}</TableCell>
                  <TableCell>{plank.locationName}</TableCell>
                  <TableCell>{plank.projectName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        );
      default:
        return null;
    }
  }

  return (
    <Grid container spacing={2} p={2}>
      <Grid container item xs={12} justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Planks</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDynamicViewClick}
          startIcon={views.find(v => v.view === dynamicView)?.icon}
        >
          Change View
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddPlankClick}
          startIcon={<AddIcon />}
        >
          Add Plank
        </Button>
      </Grid>
      <Grid item xs={12}>
        Last added plank: {planks.length > 0 ? planks[0].refId : "No planks available"}
      </Grid>
      <Grid item xs={12}>
        {planks.length > 0 ? renderPlankView(dynamicView) : <Typography variant="body1">No planks found.</Typography>}
      </Grid>
    </Grid>
  );
};

export default ListAllPlanks;
