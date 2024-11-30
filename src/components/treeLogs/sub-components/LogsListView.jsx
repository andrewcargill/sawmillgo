import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
} from "@mui/material";

const LogListView = ({ logs, onLogClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="log table" sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "primary.main", boxShadow: 2 }}>
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
              Ref ID
            </TableCell>
            <TableCell>Verified</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Parent Tree</TableCell>
            <TableCell>Planks</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Lumberjack</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Diameter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow
              key={log.id}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                "&:hover": { backgroundColor: "action.selected" },
              }}
              onClick={() => onLogClick(log)}
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
                {log.refId}
              </TableCell>
              <TableCell>{log.verified ? "Yes" : "No"}</TableCell>
              <TableCell>{log.status}</TableCell>
              <TableCell>{log.treeId}</TableCell>
              <TableCell>{log.planked ? "Yes" : "No"}</TableCell>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.speciesName}</TableCell>
              <TableCell>{log.locationName}</TableCell>
              <TableCell>{log.lumberjackName}</TableCell>
              <TableCell>{log.length}</TableCell>
              <TableCell>{log.diameter}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogListView;
