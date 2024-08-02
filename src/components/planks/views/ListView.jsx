import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
} from '@mui/material';

const ListView = ({ planks, onPlankClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main', boxShadow: 2 }}>
            <TableCell
              sx={{
                position: 'sticky',
                left: 0,
                background: 'white',
                backgroundColor: 'primary.main',
                boxShadow: 2,
                zIndex: 1,
                borderRight: '1px solid lightgrey',
              }}
            >
              ID
            </TableCell>
            <TableCell>Quality</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Width</TableCell>
            <TableCell>Depth</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planks.map((plank) => (
            <TableRow
              key={plank.id}
              sx={{
                '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                '&:hover': { backgroundColor: 'action.selected' },
              }}
              onClick={() => onPlankClick(plank)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  position: 'sticky',
                  left: 0,
                  '&:hover': { backgroundColor: 'lightgray' },
                  background: 'white',
                  borderRight: '1px solid lightgrey',
                  zIndex: 2,
                }}
              >
                {plank.refId}
              </TableCell>
              <TableCell>{plank.verified ? 'verified' : 'standard'}</TableCell>
              <TableCell>{plank.status}</TableCell>
              <TableCell>{plank.speciesName}</TableCell>
              <TableCell>{plank.grade}</TableCell>
              <TableCell>{plank.width}</TableCell>
              <TableCell>{plank.depth}</TableCell>
              <TableCell>{plank.length}</TableCell>
              <TableCell>{plank.locationName}</TableCell>
              <TableCell>{plank.projectName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
