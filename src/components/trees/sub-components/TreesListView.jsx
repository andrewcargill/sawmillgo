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

const TreesListView = ({ trees, onTreeClick }) => (
  <TableContainer component={Paper}>
    <Table aria-label="trees table" sx={{ minWidth: 800 }}>
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
          <TableCell>Species</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Logged</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Longitude</TableCell>
          <TableCell>Latitude</TableCell>
          <TableCell>Lumberjack</TableCell>
          <TableCell>Reason</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trees.map((tree) => (
          <TableRow
            key={tree.id}
            sx={{
              "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
              "&:hover": { backgroundColor: "action.selected" },
            }}
            onClick={() => onTreeClick(tree)}
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
              {tree.refId}
            </TableCell>
            <TableCell>{tree.speciesName}</TableCell>
            <TableCell>{tree.status}</TableCell>
            <TableCell>{tree.logged ? "Yes" : "No"}</TableCell>
            <TableCell>{tree.age}</TableCell>
            <TableCell>{tree.longitude}</TableCell>
            <TableCell>{tree.latitude}</TableCell>
            <TableCell>{tree.lumberjackName}</TableCell>
            <TableCell>{tree.reason}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TreesListView;
