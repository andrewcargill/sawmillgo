import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "../../firebase-config"; // Correct the import path as necessary
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const ListAllPlanks = () => {
  const [logs, setLogs] = useState([]);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const navigate = useNavigate();

  const fetchLogs = async () => {
    if (!sawmillId) {
      console.log("Sawmill ID not found. Cannot fetch logs.");
      return;
    }

    // let q = collection(db, `sawmill/${sawmillId}/logs`);
    // const snapshot = await getDocs(q);
    // const logsList = snapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),

    let q = query(
      collection(db, `sawmill/${sawmillId}/planks`),
      // orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const logsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLogs(logsList);
    console.log("Fetched planks: ", logsList);
  };

  useEffect(() => {
    fetchLogs();
  }, [sawmillId]); // Fetch logs when component mounts and sawmillId changes

  const handleAddLogClick = () => {
    navigate("/addlog");
  };

  const refreshLogList = () => {
    fetchLogs();
  };

  const handleLogClick = (logId) => {
    return () => {
      navigate(`/log/${logId}`);
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
            onClick={handleAddLogClick}
            startIcon={<AddIcon />}
          >
            add
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
       last added log: {logs.length > 0 ? logs[0].refId : "No logs available"}
      </Grid>

      <Grid
        container
        sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        alignContent={"center"}
      >
        {logs.length > 0 ? (
          logs.map((log) => (
            <Grid
              className="item-select"
              item
              container
              xs={3}
              sm={2}
              lg={2}
              key={log.id}
              m={1}
              bgcolor={"white.main"}
              style={{
        
                border: log.verified ? "4px solid green" : "2px solid lightgrey",
                borderRadius: "5px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleLogClick(log.id)}
            >
              <Grid item>
                <h3>{log.refId}</h3>
              </Grid>
              <Grid item>
                <p>{log.date}</p>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No logs found.</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ListAllPlanks;
