import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { app } from "../../firebase-config";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import GridOnIcon from "@mui/icons-material/GridOn";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import ItemDialog from "../item-dialogs/ItemDialog";

import { useNavigate } from "react-router-dom";
import AllLogsMap from "./sub-components/AllLogsMap";
import BasicView from "./sub-components/LogsBasicView";
import ListView from "./sub-components/LogsListView";


const ListAllLogs = () => {
  const [logs, setLogs] = useState([]);
  const [dynamicView, setDynamicView] = useState("basic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedLog, setSelectedLog] = useState(null);
  const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const [lastVisible, setLastVisible] = useState(null);
const [hasMoreLogs, setHasMoreLogs] = useState(true);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const navigate = useNavigate();

  const views = [
    { view: "basic", icon: <GridOnIcon /> },
    { view: "list", icon: <ListIcon /> },
  ];

  const handleDynamicViewClick = () => {
    const currentIndex = views.findIndex((v) => v.view === dynamicView);
    const nextIndex = (currentIndex + 1) % views.length;
    setDynamicView(views[nextIndex].view);
  };

  // const fetchLogs = async () => {
  //   if (!sawmillId) {
  //     console.log("Sawmill ID not found. Cannot fetch logs.");
  //     return;
  //   }
  //   const q = query(
  //     collection(db, `sawmill/${sawmillId}/logs`),
  //     orderBy("createdAt", "desc")
  //   );
  //   const snapshot = await getDocs(q);
  //   const logsList = snapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setLogs(logsList);
  // };

  const fetchLogs = async (isNextPage = false) => {
    if (!sawmillId) {
      console.log("Sawmill ID not found. Cannot fetch logs.");
      return;
    }

    const queryLimit = rowsPerPage;
    const baseQuery = query(
      collection(db, `sawmill/${sawmillId}/logs`),
      orderBy("createdAt", "desc"),
      limit(queryLimit)
    );

    let paginatedQuery = baseQuery;
    if (isNextPage && lastVisible) {
      paginatedQuery = query(baseQuery, startAfter(lastVisible));
    }

    const snapshot = await getDocs(paginatedQuery);
    const logsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setLogs(isNextPage ? [...logs, ...logsList] : logsList);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
  };

  useEffect(() => {
    fetchLogs();
  }, [sawmillId]);

  const handleChangePage = (event, newPage) => {
    if (newPage > page) {
      // Fetch the next page when moving forward
      fetchLogs(true);
    }
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
    fetchLogs(); // Fetch the first page with new rows per page
  };
  

  const handleAddLogClick = () => {
    navigate("/addlog");
  };

  const handleLogClick = (log) => {
    setSelectedLog(log);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleSaveLog = (updatedLog) => {
    console.log("Save log:", updatedLog);
    setIsModalOpen(false);
    fetchLogs();
  };

  const handleCloseDialog = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  const renderLogView = () => {
    switch (dynamicView) {
      case "basic":
        return <BasicView logs={logs} onLogClick={handleLogClick} />;
      case "list":
        return <ListView 
        logs={logs}
        onLogClick={handleLogClick}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        hasMoreLogs={hasMoreLogs}
        />;
      default:
        return null;
    }
  };

  const currentViewIcon =
    views.find((v) => v.view === dynamicView)?.icon || <AddIcon />;

  return (
    <Grid container>
      {/* Header */}
      <Grid item xs={12} p={1} mb={2} borderRadius={3} spacing={1}>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item container xs={4} alignContent={"flex-start"}>
            <Typography variant="h4" color="initial">
              Logs
            </Typography>
          </Grid>

          <Grid item container justifyContent={"flex-end"} xs={6}>
            <ButtonGroup variant="contained" color="primary">
              <IconButton
                size="small"
                color="inherit"
                onClick={handleDynamicViewClick}
                aria-label="Change View"
              >
                {currentViewIcon}
              </IconButton>
              <Button color="white" onClick={handleAddLogClick}>
                Add Log
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Grid item container alignContent={"flex-start"} xs={12}>
          <Typography variant="subtitle2">
            Last added log: {logs.length > 0 ? logs[0].refId : "No logs available"}
          </Typography>
        </Grid>
      </Grid>

      {/* Log View */}
      <Grid item xs={12}>
        {logs.length > 0 ? (
          renderLogView()
        ) : (
          <Typography variant="body1">No logs found.</Typography>
        )}
      </Grid>

      {/* Map */}
      <AllLogsMap />

      {/* Item Dialog */}
      <ItemDialog
        isOpen={isModalOpen}
        onClose={handleCloseDialog}
        itemDetails={selectedLog}
        mode={modalMode}
        type="log"
        onSave={handleSaveLog}
      />
    </Grid>
  );
};

export default ListAllLogs;
