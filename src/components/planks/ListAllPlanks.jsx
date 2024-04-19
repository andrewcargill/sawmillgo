import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { app } from "../../firebase-config";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PlankListContent from "./sub-components/PlankListContent";
import AppsIcon from "@mui/icons-material/Apps";
import GridOnIcon from "@mui/icons-material/GridOn";
import GridOffIcon from "@mui/icons-material/GridOff";
import ListIcon from "@mui/icons-material/List";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
  Chip,
  Modal,
  Box,
} from "@mui/material";
import FilterModal from "./sub-components/filter-components/FilterModal";

const ListAllPlanks = () => {
  const [planks, setPlanks] = useState([]);
  const [dynamicView, setDynamicView] = useState("list");
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newestPlank, setNewestPlank] = useState("");

  // Filters
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [allFilters, setAllFilters] = useState([
   
  ]);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const navigate = useNavigate();

  const views = [
    { view: "dynamic", icon: <AppsIcon /> },
    { view: "basic", icon: <GridOnIcon /> },
    { view: "list", icon: <ListIcon /> },
  ];

  const handleDynamicViewClick = () => {
    const currentIndex = views.findIndex((v) => v.view === dynamicView);
    const nextIndex = (currentIndex + 1) % views.length;
    setDynamicView(views[nextIndex].view);
  };

  const fetchPlanks = async () => {
    if (!sawmillId) {
      console.log("Sawmill ID not found. Cannot fetch planks.");
      return;
    }

    const baseQuery = collection(db, `sawmill/${sawmillId}/planks`);
    let q = query(baseQuery, orderBy("createdAt", "desc"));

    // Filters
    if (verifiedFilter) {
      q = query(
        baseQuery,
        where("verified", "==", true),
        orderBy("createdAt", "desc")
      );
    }

    const snapshot = await getDocs(q);
    console.log("verifiedFilter", verifiedFilter);
    const planksList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPlanks(planksList);
  };

  useEffect(() => {
    fetchPlanks();
    console.log("allFilters", allFilters);
  }, [sawmillId, verifiedFilter, allFilters]);

  const handleAddPlankClick = () => {
    navigate("/addplank");
  };

  const handlePlankClick = (plankId) => () => {
    navigate(`/plank/${plankId}`);
  };

  function renderPlankView(view) {
    switch (view) {
      case "dynamic":
        return (
          <Grid container>
            {planks.map((plank) => (
              <Grid onClick={handlePlankClick(plank.id)}>
                <PlankListContent data={plank} />
              </Grid>
            ))}
          </Grid>
        );
      case "basic":
        return (
          <Grid container>
            {planks.map((plank) => (
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
                  border: plank.verified
                    ? "4px solid green"
                    : "2px solid lightgrey",
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
      case "list":
        return (
          <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      position: "sticky",
                      left: 0,
                      background: "white",
                      zIndex: 1,
                    }}
                  >
                    Ref ID
                  </TableCell>
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                    onClick={handlePlankClick(plank.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        position: "sticky",
                        left: 0,
                        background: "white",
                        zIndex: 1,
                      }}
                    >
                      {plank.refId}
                    </TableCell>
                    <TableCell>
                      {plank.verified ? "verified" : "standard"}
                    </TableCell>
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

  const handleOpenModal = (modalType) => () => {
    setOpenModal(true);
    setModalType(modalType);
  };

  // Filter Functions
  const toggleVerifiedFilter = () => {
    setVerifiedFilter(!verifiedFilter); // Toggle the state of verified filter
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Planks</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDynamicViewClick}
          startIcon={views.find((v) => v.view === dynamicView)?.icon}
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
        Last added plank:{" "}
        {planks.length > 0 ? planks[0].refId : "No planks available"}
      </Grid>

      <Grid
        container
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
        alignContent="flex-start"
      >
        <Grid
          item
          xs={12}
          mt={1}
          container
          sx={{ minWidth: 500, flexWrap: "nowrap" }}
        >
          <Grid pr={1}>
            <Chip
              icon={<TuneIcon />}
              variant="outlined"
              color={"primary"}
              label="All Filters"
              onClick={handleOpenModal("allFilters")}
            />
          </Grid>
          <Grid pr={1}>
            <Chip
              variant={verifiedFilter ? "contained" : "outlined"}
              color={"primary"}
              label="Verified"
              onClick={toggleVerifiedFilter}
            />
          </Grid>
          <Grid pr={1}>
            <Chip
              variant="outlined"
              color={"primary"}
              label="Species"
              onClick={handleOpenModal("species")}
            />
          </Grid>
          <Grid pr={1}>
            <Chip
              variant="outlined"
              color={"primary"}
              label="Status"
              onClick={handleOpenModal("status")}
            />
          </Grid>
          <Grid pr={1}>
            <Chip
              variant="outlined"
              color={"primary"}
              label="Grade"
              onClick={handleOpenModal("grade")}
            />
          </Grid>
          <Grid pr={1}>
            <Chip
              variant="outlined"
              color={"primary"}
              label="Dimensions"
              onClick={handleOpenModal("dimensions")}
            />
          </Grid>
          <Grid pr={1}>
            <Chip
              variant="outlined"
              color={"primary"}
              label="Location"
              onClick={handleOpenModal("locations")}
            />
          </Grid>
          <Grid pr={1}>
            <Chip
              variant="outlined"
              color={"primary"}
              label="Project"
              onClick={handleOpenModal("projects")}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {planks.length > 0 ? (
          renderPlankView(dynamicView)
        ) : (
          <Typography variant="body1">No planks found.</Typography>
        )}
      </Grid>

        <FilterModal allFilters={allFilters} setAllFilters={setAllFilters} openModal={openModal} setOpenModal={setOpenModal} modalType={modalType} />

      {/* <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="tree-details-title"
        aria-describedby="tree-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: { xs: "80vh", sm: "90vh" }, // Adjusted max height
            overflowY: "auto", // Ensures scrollability
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">{modalType}</Typography>
        </Box>
      </Modal> */}
    </Grid>
  );
};

export default ListAllPlanks;
