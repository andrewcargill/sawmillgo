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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Ref ID</TableCell>
          <TableCell>Species</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Logged</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trees.map((tree) => (
          <TableRow
            key={tree.id}
            onClick={() => onTreeClick(tree)}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            <TableCell>{tree.refId}</TableCell>
            <TableCell>{tree.speciesName}</TableCell>
            <TableCell>{tree.status}</TableCell>
            <TableCell>{tree.logged ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TreesListView;
