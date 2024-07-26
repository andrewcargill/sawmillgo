import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { app } from "../../firebase-config"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Tooltip } from "@mui/material";

const LocationGauge = () => {
  const [locations, setLocations] = useState([]);
  const db = getFirestore(app);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      console.log("Locations: Fetching locations...");
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = userLocalStorage?.sawmillId;
      console.log("Sawmill ID: ", sawmillId);

      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

      // Reference to the 'trees' sub-collection within a specific 'sawmill'
      const locationsRef = collection(db, `sawmill/${sawmillId}/locations`);
      console.log(
        "Locations: Reference to locations collection: ",
        locationsRef
      );
      try {
        const querySnapshot = await getDocs(locationsRef);
        const locationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locationsList);
        console.log("Fetched locations: ", locationsList);
      } catch (error) {
        console.error("Error fetching locations: ", error);
      }
    };

    fetchLocations();
  }, []); // Dependency array is empty, so this runs once on component mount

  const handleAddClick = () => {
    navigate("/locations");
  };

  return (
    <>
      <Tooltip title="View and edit storage locations">
        <Grid
          border={1}
          borderRadius={3}
          p={2}
          boxShadow={5}
          bgcolor={"white.main"}
          textAlign="center"
          onClick={handleAddClick}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "primary.main",
            },
            transition: "background-color 0.5s",
          }}
        >
          <LocationOnIcon fontSize="large" />
          <Typography color="initial">
            Locations
            <Typography component="span" variant="body2" color="initial">
              {" "}
              ({locations.length})
            </Typography>
          </Typography>
        </Grid>
      </Tooltip>
    </>
  );
};

export default LocationGauge;
