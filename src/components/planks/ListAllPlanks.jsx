// ListAllPlanks.jsx

import React, { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { app } from '../../firebase-config';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListIcon from '@mui/icons-material/List';
import TuneIcon from '@mui/icons-material/Tune';
import { Chip, ButtonGroup, IconButton } from '@mui/material';
import FilterModal from './sub-components/filter-components/FilterModal';
import TableRowsIcon from '@mui/icons-material/TableRows';

import DynamicView from './views/DynamicView';
import BasicView from './views/BasicView';
import ListView from './views/ListView';
import ItemDialog from '../item-dialogs/ItemDialog';

const ListAllPlanks = () => {
  const [planks, setPlanks] = useState([]);
  const [dynamicView, setDynamicView] = useState('list');
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [activeSpecies, setActiveSpecies] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlank, setSelectedPlank] = useState(null);
  const [dialogMode, setDialogMode] = useState('view');

  // Filters
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [allFilters, setAllFilters] = useState([]);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem('user'))?.sawmillId;
  const navigate = useNavigate();

  const views = [
    { view: 'dynamic', icon: <AppsIcon /> },
    { view: 'basic', icon: <GridOnIcon /> },
    { view: 'list', icon: <ListIcon /> },
  ];

  const handleDynamicViewClick = () => {
    const currentIndex = views.findIndex((v) => v.view === dynamicView);
    const nextIndex = (currentIndex + 1) % views.length;
    setDynamicView(views[nextIndex].view);
  };

  const fetchPlanks = async () => {
    // Assume allFilters includes: grade, status, speciesId, projectId, and length as a range
    const baseQuery = collection(db, `sawmill/${sawmillId}/planks`);
    let conditions = [orderBy('createdAt', 'desc')];

    // Verified filter
    if (verifiedFilter) conditions.push(where('verified', '==', true));

    // Equality filters
    if (allFilters.grade)
      conditions.push(where('grade', '==', allFilters.grade));
    if (allFilters.status)
      conditions.push(where('status', '==', allFilters.status));
    if (allFilters.speciesId)
      conditions.push(where('speciesId', '==', allFilters.speciesId));
    if (allFilters.projectId)
      conditions.push(where('projectId', '==', allFilters.projectId));
    if (allFilters.locationId)
      conditions.push(where('locationId', '==', allFilters.locationId));

    // Single dimension range filter
    if (allFilters.length) {
      conditions.push(where('length', '>=', allFilters.length[0]));
      conditions.push(where('length', '<=', allFilters.length[1]));
    }

    if (allFilters.width) {
      conditions.push(where('width', '>=', allFilters.width[0]));
      conditions.push(where('width', '<=', allFilters.width[1]));
    }

    if (allFilters.depth) {
      conditions.push(where('depth', '>=', allFilters.depth[0]));
      conditions.push(where('depth', '<=', allFilters.depth[1]));
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
    console.log('allFilters', allFilters);
    setActiveSpecies(!!allFilters.speciesId);
    setActiveStatus(!!allFilters.status);
  }, [sawmillId, verifiedFilter, allFilters]);

  // const handleAddPlankClick = () => {
  //   setDialogMode('add');
  //   setSelectedPlank(null); // Clear selected plank for adding
  //   setIsDialogOpen(true);
  // };

  const handleAddPlankClick = () => {
    navigate("/addplank");
  };

  const handlePlankClick = (plank) => {
    setSelectedPlank(plank);
    setDialogMode('view');
    setIsDialogOpen(true);
  };

  const handleSavePlank = (updatedPlank) => {
    // Logic to save the updated or new plank
    console.log('Save plank:', updatedPlank);
    setIsDialogOpen(false);
    setSelectedPlank(null); // Reset the selected plank after saving
    fetchPlanks(); // Refresh the list after saving
  };

  const handleOpenModal = (modalType) => () => {
    setOpenModal(true);
    setModalType(modalType);
  };

  // Filter Functions
  const toggleVerifiedFilter = () => {
    setVerifiedFilter(!verifiedFilter); // Toggle the state of verified filter
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPlank(null); // Clear selected plank on dialog close
  };

  const handleResetFilter = (filter) => () => {
    if (filter === 'species') {
      setAllFilters((prevFilters) => ({
        ...prevFilters,
        speciesId: null,
        speciesName: null,
      }));
    } else if (filter === 'locations') {
      setAllFilters((prevFilters) => ({
        ...prevFilters,
        locationId: null,
        locationName: null,
      }));
    } else if (filter === 'projects') {
      setAllFilters((prevFilters) => ({
        ...prevFilters,
        projectId: null,
        projectName: null,
      }));
    } else if (filter === 'dimensions') {
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

  const renderPlankView = () => {
    switch (dynamicView) {
      case 'dynamic':
        return <DynamicView planks={planks} onPlankClick={handlePlankClick} />;
      case 'basic':
        return <BasicView planks={planks} onPlankClick={handlePlankClick} />;
      case 'list':
        return <ListView planks={planks} onPlankClick={handlePlankClick} />;
      default:
        return null;
    }
  };

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
          <Grid item container xs={4} alignContent={'flex-start'}>
            <TableRowsIcon fontSize="large" />
            <Typography variant="body1" p={1}>
              {' '}
              Planks{' '}
            </Typography>
          </Grid>

          <Grid item container justifyContent={'flex-end'} xs={6}>
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
          alignContent={'flex-start'}
          xs={12}
        >
          <Typography variant="subtitle2">
            Last added plank:{' '}
            {planks.length > 0 ? planks[0].refId : 'No planks available'}
          </Typography>
        </Grid>
      </Grid>

      <Grid container borderRadius={3} item xs={12} p={1} mb={2}>
        <Grid
          container
          item
          sx={{
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          }}
          alignContent="flex-start"
          className="filter-chip-countainer"
        >
          <Grid
            item
            xs={12}
            mt={1}
            container
            sx={{ minWidth: 500, flexWrap: 'nowrap' }}
            className="filter-chip-inner-container"
          >
            <Grid pr={1}>
              <Chip
                icon={<TuneIcon />}
                variant="outlined"
                color={'primary'}
                label="All Filters"
                onClick={handleOpenModal('allFilters')}
              />
            </Grid>
            <Grid pr={1}>
              <Chip
                variant={verifiedFilter ? 'contained' : 'outlined'}
                color={'primary'}
                label={'Verified'}
                onClick={toggleVerifiedFilter}
              />
            </Grid>
            <Grid pr={1}>
              <Chip
                variant={allFilters.status ? 'contained' : 'outlined'}
                color={'primary'}
                label={
                  allFilters.status
                    ? `Status: ${allFilters.status || ''}`
                    : 'Status'
                }
                onClick={handleOpenModal('status')}
                onDelete={
                  allFilters.status ? handleResetFilter('status') : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>

            <Grid pr={1}>
              <Chip
                variant={allFilters.speciesId ? 'contained' : 'outlined'}
                color={'primary'}
                label={
                  allFilters.speciesId
                    ? `Species: ${allFilters.speciesName || ''}`
                    : 'Species'
                }
                onClick={handleOpenModal('species')}
                disabled={!activeStatus}
                onDelete={
                  allFilters.speciesId
                    ? handleResetFilter('species')
                    : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>

            <Grid pr={1}>
              <Chip
                variant={allFilters.grade ? 'contained' : 'outlined'}
                color={'primary'}
                label={
                  allFilters.grade
                    ? `Grade: ${allFilters.grade || ''}`
                    : 'Grade'
                }
                onClick={handleOpenModal('grade')}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.grade ? handleResetFilter('grade') : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>

            <Grid pr={1}>
              <Chip
                variant={allFilters.length ? 'contained' : 'outlined'}
                color={'primary'}
                label={
                  allFilters.length
                    ? `Length: ${allFilters.length[0] || ''}-${
                        allFilters.length[1]
                      }cm`
                    : 'Length'
                }
                onClick={handleOpenModal('length')}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.length ? handleResetFilter('length') : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>

            <Grid pr={1}>
              <Chip
                variant={allFilters.width ? 'contained' : 'outlined'}
                color={'primary'}
                label={
                  allFilters.width
                    ? `Width: ${allFilters.width[0] || ''}-${
                        allFilters.width[1]
                      }cm`
                    : 'Width'
                }
                onClick={handleOpenModal('width')}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.width ? handleResetFilter('width') : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>
            <Grid pr={1}>
              <Chip
                variant={allFilters.depth ? 'contained' : 'outlined'}
                color={'primary'}
                label={
                  allFilters.depth
                    ? `Depth: ${allFilters.depth[0] || ''}-${
                        allFilters.depth[1]
                      }cm`
                    : 'Depth'
                }
                onClick={handleOpenModal('depth')}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.depth ? handleResetFilter('depth') : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>
            <Grid pr={1}>
              <Chip
                variant={allFilters.locationId ? 'contained' : 'outlined'}
                color={'primary'}
                label={
                  allFilters.locationId
                    ? `Location: ${allFilters.locationName || ''}`
                    : 'Location'
                }
                onClick={handleOpenModal('locations')}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.locationId
                    ? handleResetFilter('locations')
                    : undefined
                }
                deleteIcon={<CancelIcon />}
              />
            </Grid>
            <Grid pr={1}>
              <Chip
                variant={allFilters.projectId ? 'contained' : 'outlined'}
                color={'primary'}
                label={
                  allFilters.projectId
                    ? `Project: ${allFilters.projectName || ''}`
                    : 'Project'
                }
                onClick={handleOpenModal('projects')}
                disabled={!activeSpecies}
                onDelete={
                  allFilters.projectId
                    ? handleResetFilter('projects')
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
          renderPlankView()
        ) : (
          <Typography variant="body1">No planks found.</Typography>
        )}
      </Grid>

      <ItemDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        itemDetails={selectedPlank}
        mode={dialogMode}
        type="plank"
        onSave={handleSavePlank}
      />

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
