import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { fetchLocationsForSawmill, fetchProjectsForSawmill, fetchSpeciesForSawmill } from "../../utils/filestoreOperations";
import { CircularProgress, Typography, Box } from "@mui/material";
import PlankForm from "./form-templates/PlankForm";
import TreeForm from "./form-templates/TreeForm";
import LogForm from "./form-templates/LogForm";


const ItemForm = ({ type, itemDetails, onChange, onSave, mode }) => {
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const db = getFirestore();
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedSpecies, fetchedLocations, fetchedProjects] =
          await Promise.all([
            fetchSpeciesForSawmill(db, sawmillId),
            fetchLocationsForSawmill(db, sawmillId),
            fetchProjectsForSawmill(db, sawmillId, itemDetails?.verified || false),
          ]);

        setSpecies(fetchedSpecies);
        setLocations(fetchedLocations);
        setProjects(
          fetchedProjects.map((project) => ({
            id: project.id,
            name: project.projectName,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load additional data.");
      } finally {
        setLoading(false);
      }
    };

    if (sawmillId) {
      fetchData();
    }
  }, [db, sawmillId, itemDetails?.verified]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="body2" color="error">
        {error}
      </Typography>
    );
  }

  const commonProps = {
    onChange,
    onSubmit: (e) => {
      e.preventDefault();
      onSave(itemDetails);
    },
    mode,
  };

  switch (type) {
    case "tree":
      return (
       

        <TreeForm
          tree={itemDetails}
          species={species}
          locations={locations}
          projects={projects}
          {...commonProps}
        />
  
      );
    case "log":
      return (
      
        <LogForm
          log={itemDetails}
          species={species}
          locations={locations}
          projects={projects}
          {...commonProps}
        />
  
      );
    case "plank":
      return (
        <PlankForm
          plank={itemDetails}
          species={species}
          locations={locations}
          projects={projects}
          {...commonProps}
        />
      );
    default:
      return <Typography>Unknown item type</Typography>;
  }
};

export default ItemForm;
