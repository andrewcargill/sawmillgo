import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import BlockIcon from "@mui/icons-material/Block";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const BasicView = ({ logs, onLogClick }) => {
  return (
    <Grid container spacing={2}>
      {logs.map((log) => (
        <Grid
          item
          xs={3}
          sm={2}
          lg={2}
          key={log.id}
          onClick={() => onLogClick(log)}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "primary.light" },
            transition: "background-color 0.3s",
          }}
        >
          <Grid item>
            <Typography variant="h6">{log.refId}</Typography>
          </Grid>
          <Grid item>
            <Typography>{log.speciesName}</Typography>
          </Grid>
          <div>
            {log.verified && (
              <Tooltip title="Verified">
                <WorkspacePremiumIcon color="primary" />
              </Tooltip>
            )}
            {log.planked && (
              <Tooltip title="Planked">
                <BlockIcon />
              </Tooltip>
            )}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default BasicView;
