import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase-config"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import FactoryIcon from "@mui/icons-material/Factory";

const SawmillProfileGauge = () => {
  const [trees, setTrees] = useState([]);
  const [planks, setPlanks] = useState([]);
  const db = getFirestore(app);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanks = async () => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = userLocalStorage?.sawmillId;

      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

      const planksRef = collection(db, `sawmill/${sawmillId}/planks`);
      try {
        const querySnapshot = await getDocs(planksRef);
        const planksList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlanks(planksList);
        console.log("Fetched planks: ", planksList);
      } catch (error) {
        console.error("Error fetching planks: ", error);
      }
    };

    fetchPlanks();
  }, []); // Dependency array is empty, so this runs once on component mount

  const handleAddClick = () => {
    navigate("/sawmill-details");
  };

  return (
    <>
      <Tooltip title="View and edit the sawmill profile">
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
          <FactoryIcon fontSize="large" />
          <Typography color="initial">
            Profile
            <Typography component="span" variant="body2" color="initial">
              {" "}
            </Typography>
          </Typography>
        </Grid>
      </Tooltip>
    </>
  );
};

export default SawmillProfileGauge;
