import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ListAllPlanks from "../../components/planks/ListAllPlanks";
import AllPlanksMap from "../../components/planks/sub-components/AllPlanksMap";
import ListAllPlanksRef from "../../components/planks/ListAllPlanksRef";

const PlanksPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid p={1}>
        <ListAllPlanks />
        {/* <ListAllPlanksRef /> */}
        <Grid container item>
          {/* <AllPlanksMap /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default PlanksPage;
