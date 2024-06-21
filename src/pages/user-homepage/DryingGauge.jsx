import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase-config"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Tooltip } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const DryingGauge = () => {
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

  const handleAddClick = () => {};

  return (
    <>
      <Tooltip title="Coming Soon - Drying data for stock and locations">
        <Grid
          border={1}
          borderRadius={3}
          p={2}
          boxShadow={5}
          bgcolor={"lightgray"}
          textAlign="center"
          sx={{
            "&:hover": {
              backgroundColor: "lightgray",
            },
            transition: "lightgray 0.3s",
          }}
        >
          <WaterDropIcon fontSize="large" />
          <Typography color="initial">
            DRYING
            <Typography component="span" variant="body2" color="initial">
              {" "}
            </Typography>
          </Typography>
        </Grid>
      </Tooltip>
    </>
  );
};

export default DryingGauge;
