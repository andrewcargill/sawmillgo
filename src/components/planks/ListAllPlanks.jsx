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
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import PlankListContent from "./sub-components/PlankListContent";
import AppsIcon from "@mui/icons-material/Apps";
import GridOnIcon from "@mui/icons-material/GridOn";
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
  ButtonGroup,
  IconButton,
} from "@mui/material";
import FilterModal from "./sub-components/filter-components/FilterModal";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Tooltip } from "@mui/material";

const ListAllPlanks = () => {
  const [planks, setPlanks] = useState([]);
  const [dynamicView, setDynamicView] = useState("list");
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newestPlank, setNewestPlank] = useState("");
  const [activeSpecies, setActiveSpecies] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);

  // Filters
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [allFilters, setAllFilters] = useState([]);

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
    // Assume allFilters includes: grade, status, speciesId, projectId, and length as a range
    const baseQuery = collection(db, `sawmill/${sawmillId}/planks`);
    let conditions = [orderBy("createdAt", "desc")];

    // Verified filter
    if (verifiedFilter) conditions.push(where("verified", "==", true));

    // Equality filters
    if (allFilters.grade)
      conditions.push(where("grade", "==", allFilters.grade));
    if (allFilters.status)
      conditions.push(where("status", "==", allFilters.status));
    if (allFilters.speciesId)
      conditions.push(where("speciesId", "==", allFilters.speciesId));
    if (allFilters.projectId)
      conditions.push(where("projectId", "==", allFilters.projectId));
    if (allFilters.locationId)
      conditions.push(where("locationId", "==", allFilters.locationId));

    // Single dimension range filter
    if (allFilters.length) {
      conditions.push(where("length", ">=", allFilters.length[0]));
      conditions.push(where("length", "<=", allFilters.length[1]));
    }

    if (allFilters.width) {
      conditions.push(where("width", ">=", allFilters.width[0]));
      conditions.push(where("width", "<=", allFilters.width[1]));
    }

    if (allFilters.depth) {
      conditions.push(where("depth", ">=", allFilters.depth[0]));
      conditions.push(where("depth", "<=", allFilters.depth[1]));
    }

    // You must have a composite index for each combination you plan to query on
    const queryToExecute = query(baseQuery, ...conditions);

    // Execute query
    const snapshot = await getDocs(queryToExecute);
    const planksList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPlanks(planksList);
  };

  useEffect(() => {
    fetchPlanks();
    console.log("allFilters", allFilters);
    if (!allFilters.speciesId) {
      setActiveSpecies(false);
    } else if (allFilters.speciesId === null) {
      setActiveSpecies(false);
    } else {
      setActiveSpecies(true);
    }

    if (!allFilters.status) {
      setActiveStatus(false);
    } else if (allFilters.status === null) {
      setActiveSpecies(false);
    } else {
      setActiveStatus(true);
    }

    setActiveSpecies(!!allFilters.speciesId);
    setActiveStatus(!!allFilters.status);
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
          <Grid 
          container
        sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        alignContent={"center"}
          >
            {planks.map((plank) => (
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
                  position: "relative", // Ensure this container is the positioning context
                  border: "2px solid lightgrey",
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
                <Grid item pt={4} pb={4}>
                  <Typography variant="h6">{plank.refId}</Typography>
                  <Typography variant="body2">{plank.speciesName}</Typography>
                </Grid>

                {/* Labels */}
                <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                  {plank.projectId && (
                    <Tooltip title={`Project: ${plank.projectName}`} arrow>
                      <LocalOfferIcon color="dark" fontSize="small" />
                    </Tooltip>
                  )}
                  {plank.verified && (
                    <Tooltip title="Verified" arrow>
                      <WorkspacePremiumIcon color="primary" fontSize="small" />
                    </Tooltip>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        );
      case "list":
        return (
          <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow
                  sx={{ backgroundColor: "primary.main", boxShadow: 2 }}
                >
                  <TableCell
                    sx={{
                      position: "sticky",
                      left: 0,
                      background: "white",
                      backgroundColor: "primary.main",
                      boxShadow: 2,
                      zIndex: 1,
                      borderRight: "1px solid lightgrey",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell>Quality</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Species</TableCell>
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
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                      "&:hover": { backgroundColor: "action.selected" },
                    }}
                    onClick={handlePlankClick(plank.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        position: "sticky",
                        left: 0,
                        "&:hover": { backgroundColor: "lightgray" },
                        background: "white",
                        borderRight: "1px solid lightgrey",
                        zIndex: 2,
                      }}
                    >
                      {plank.refId}
                    </TableCell>
                    <TableCell>
                      {plank.verified ? "verified" : "standard"}
                    </TableCell>
                    <TableCell>{plank.status}</TableCell>
                    <TableCell>{plank.speciesName}</TableCell>
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

  const handleResetFilter = (filter) => () => {
    if (filter === "species") {
      setAllFilters((prevFilters) => ({
        ...prevFilters,
        speciesId: null,
        speciesName: null,
      }));
    } else if (filter === "locations") {
      setAllFilters((prevFilters) => ({
        ...prevFilters,
        locationId: null,
        locationName: null,
      }));
    } else if (filter === "projects") {
      setAllFilters((prevFilters) => ({
        ...prevFilters,
        projectId: null,
        projectName: null,
      }));
    } else if (filter === "dimensions") {
      setAllFilters((prevFilters) => ({
        ...prevFilters,
        length: null,
      }));
    } else {
      setAllFilters((prevFilters) => ({
        ...prevFilters,
        [filter]: null,
      }));
    }
  };

  const currentViewIcon = views.find((v) => v.view === dynamicView)?.icon || (
    <AddIcon />
  );

  return (
    <Grid container>
      <Grid item xs={12} p={1} mb={2} borderRadius={3} spacing={1}>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item container xs={4} alignContent={"flex-start"}>
            <TableRowsIcon fontSize="large" />
            <Typography variant="body1" p={1}>
              {" "}
              Planks{" "}
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
              <Button color="white" onClick={handleAddPlankClick}>
                Add Plank
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Grid
          item
          container
          bgcolor="background.paper"
          alignContent={"flex-start"}
          xs={12}
        >
          <Typography variant="subtitle2">
            Last added plank:{" "}
            {planks.length > 0 ? planks[0].refId : "No planks available"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container borderRadius={3} item xs={12} p={1} mb={2}>
        <Grid
          container
          item
          sx={{
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
          alignContent="flex-start"
          className="filter-chip-countainer"
        >
          <Grid
            item
            xs={12}
            mt={1}
            container
            sx={{ minWidth: 500, flexWrap: "nowrap" }}
            className="filter-chip-inner-container"
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
                label={"Verified"}
                onClick={toggleVerifiedFilter}
              />
            </Grid>
            <Grid pr={1}>
              <Chip
                variant={allFilters.status ? "contained" : "outlined"}
                color={"primary"}
                label={
                  allFilters.status
                    ? `Status: ${allFilters.status || ""}`
                    : "Status"
                }
                onClick={handleOpenModal("status")}
                onDelete={
                  allFilters.status ? handleResetFilter("status") : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>

            <Grid pr={1}>
              <Chip
                variant={allFilters.speciesId ? "contained" : "outlined"}
                color={"primary"}
                label={
                  allFilters.speciesId
                    ? `Species: ${allFilters.speciesName || ""}`
                    : "Species"
                }
                onClick={handleOpenModal("species")}
                disabled={!activeStatus}
                onDelete={
                  allFilters.speciesId
                    ? handleResetFilter("species")
                    : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>

            <Grid pr={1}>
              <Chip
                variant={allFilters.grade ? "contained" : "outlined"}
                color={"primary"}
                label={
                  allFilters.grade
                    ? `Grade: ${allFilters.grade || ""}`
                    : "Grade"
                }
                onClick={handleOpenModal("grade")}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.grade ? handleResetFilter("grade") : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>

            <Grid pr={1}>
              <Chip
                variant={allFilters.length ? "contained" : "outlined"}
                color={"primary"}
                label={
                  allFilters.length
                    ? `Length: ${allFilters.length[0] || ""}-${
                        allFilters.length[1]
                      }cm`
                    : "Length"
                }
                onClick={handleOpenModal("length")}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.length ? handleResetFilter("length") : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>

            <Grid pr={1}>
              <Chip
                variant={allFilters.width ? "contained" : "outlined"}
                color={"primary"}
                label={
                  allFilters.width
                    ? `Width: ${allFilters.width[0] || ""}-${
                        allFilters.width[1]
                      }cm`
                    : "Width"
                }
                onClick={handleOpenModal("width")}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.width ? handleResetFilter("width") : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>
            <Grid pr={1}>
              <Chip
                variant={allFilters.depth ? "contained" : "outlined"}
                color={"primary"}
                label={
                  allFilters.depth
                    ? `Depth: ${allFilters.depth[0] || ""}-${
                        allFilters.depth[1]
                      }cm`
                    : "Depth"
                }
                onClick={handleOpenModal("depth")}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.depth ? handleResetFilter("depth") : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>
            <Grid pr={1}>
              <Chip
                variant={allFilters.locationId ? "contained" : "outlined"}
                color={"primary"}
                label={
                  allFilters.locationId
                    ? `Location: ${allFilters.locationName || ""}`
                    : "Location"
                }
                onClick={handleOpenModal("locations")}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.locationId
                    ? handleResetFilter("locations")
                    : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>
            <Grid pr={1}>
              <Chip
                variant={allFilters.projectId ? "contained" : "outlined"}
                color={"primary"}
                label={
                  allFilters.projectId
                    ? `Project: ${allFilters.projectName || ""}`
                    : "Project"
                }
                onClick={handleOpenModal("projects")}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.projectId
                    ? handleResetFilter("projects")
                    : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>
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

      <FilterModal
        allFilters={allFilters}
        setAllFilters={setAllFilters}
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalType={modalType}
      />
    </Grid>
  );
};

export default ListAllPlanks;
