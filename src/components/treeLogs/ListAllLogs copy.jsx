import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "../../firebase-config"; // Correct the import path as necessary
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import BlockIcon from "@mui/icons-material/Block";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Tooltip } from "@mui/material";

const ListAllLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Assuming modal state management
  const [modalMode, setModalMode] = useState("view"); // Default mode

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const navigate = useNavigate();

  const fetchLogs = async () => {
    if (!sawmillId) {
      console.log("Sawmill ID not found. Cannot fetch logs.");
      return;
    }
    let q = query(
      collection(db, `sawmill/${sawmillId}/logs`),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const logsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLogs(logsList);
  };

  useEffect(() => {
    fetchLogs();
  }, [sawmillId]);

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
            Logs
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
            item
            xs={3}
              sm={2}
              lg={2}
              key={log.id}
              m={1}
            border={1}
            borderRadius={3}
            p={2}
            boxShadow={2}
            bgcolor={"white.main"}
            textAlign="center"
            style={{
               position: "relative",
            }}
           
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "primary.main",
              },
              transition: "background-color 0.5s",
            }}
              onClick={handleLogClick(log.id)}
            >
              <Grid item>
                <h3>{log.refId}</h3>
              </Grid>
              <Grid item>
                <p>{log.speciesName}</p>
              </Grid>
              {/* Position the icon absolutely within its parent Grid container */}
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                {log.plankIds && log.plankIds.length > 0 && (
                  <Tooltip title={`${log.plankIds.length} Planks`} arrow>
                    <CarpenterIcon color="dark" fontSize="small" />
                  </Tooltip>
                )}

                {log.planked && (
                  <Tooltip title="Planked" arrow>
                    <BlockIcon color="dark" fontSize="small" />
                  </Tooltip>
                )}

                {log.projectId && (
                  <Tooltip title={`Project: ${log.projectName}`} arrow>
                    <LocalOfferIcon color="dark" fontSize="small" />
                  </Tooltip>
                )}
                {log.verified && (
                  <Tooltip title="Verified" arrow>
                    <WorkspacePremiumIcon color="primary" fontSize="small" />
                  </Tooltip>
                )}
              </div>
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

export default ListAllLogs;
