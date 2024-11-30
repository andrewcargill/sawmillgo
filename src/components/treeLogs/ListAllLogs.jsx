import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  ButtonGroup,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import GridOnIcon from "@mui/icons-material/GridOn";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "../../firebase-config";
import BasicView from "./sub-components/LogsBasicView";
import ListView from "./sub-components/LogsListView";
import ItemDialog from "../item-dialogs/ItemDialog";
import AllLogsMap from "./sub-components/AllLogsMap";

const ListAllLogs = () => {
  const [logs, setLogs] = useState([]);
  const [dynamicView, setDynamicView] = useState("list");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  const views = [
    { view: "basic", icon: <GridOnIcon /> },
    { view: "list", icon: <ListIcon /> },
  ];

  const handleDynamicViewClick = () => {
    const currentIndex = views.findIndex((v) => v.view === dynamicView);
    const nextIndex = (currentIndex + 1) % views.length;
    setDynamicView(views[nextIndex].view);
  };

  const fetchLogs = async () => {
    if (!sawmillId) return;

    try {
      setLoading(true);
      const logsRef = collection(db, `sawmill/${sawmillId}/logs`);
      const logsQuery = query(logsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(logsQuery);

      const logsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLogs(logsList);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [sawmillId]);

  const handleLogClick = (log) => {
    setSelectedLog(log);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedLog(null);
  };

  const renderLogView = () => {
    switch (dynamicView) {
      case "basic":
        return <BasicView logs={logs} onLogClick={handleLogClick} />;
      case "list":
        return <ListView logs={logs} onLogClick={handleLogClick} />;
      default:
        return null;
    }
  };

  const currentViewIcon =
    views.find((v) => v.view === dynamicView)?.icon || <AddIcon />;

  return (
    <Grid container spacing={2}>
      {/* Header */}
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Logs</Typography>
          <ButtonGroup>
            <IconButton onClick={handleDynamicViewClick}>{currentViewIcon}</IconButton>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Log
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {/* Log View */}
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : logs.length > 0 ? (
          renderLogView()
        ) : (
          <Typography variant="body1">No logs found.</Typography>
        )}
      </Grid>

      {/* Log Map */}
      <Grid item xs={12}>
        <AllLogsMap />
        </Grid>

      {/* Item Dialog */}
      <ItemDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        itemDetails={selectedLog}
        type="log"
      />
    </Grid>
  );
};

export default ListAllLogs;
