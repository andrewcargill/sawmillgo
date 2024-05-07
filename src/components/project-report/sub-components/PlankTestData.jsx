import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export function SlideOne() {
    return (
        <Box textAlign="center">
            <Typography variant="h4">The journey of XXSS</Typography>
            <Typography variant="body1">begins on Sept 12 2021</Typography>
         
        </Box>
    );
}

const rows = [
    { id: 1, name: 'Ref', description: 'TTEL' },
    { id: 2, name: 'age', description: '80-100' },
    { id: 3, name: 'speices', description: 'Pine' },
    { id: 4, name: 'Reason', description: 'To let more light into the forest' },
    { id: 5, name: 'Location', description: 'Forest 2' }
  ];

export function SlideTwo() {
    return (
        <Box textAlign="center">
        <Typography variant="h4">Tree felled</Typography>
        <Typography variant="body1">John Doe removed the tree. Here is the data we have:</Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Tile</TableCell>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>
                {row.name}
              </TableCell>
              <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
    </Box>
    );
}

const logs = [
    { id: 1, name: 'Log Ref', description: 'TTMM' },
    { id: 2, name: 'Length', description: '400cm' },
    { id: 3, name: 'Diameter', description: '30cm' },

    { id: 4, name: 'Location', description: 'Forest 3' }
  ];

export function SlideThree() {
    return (
        <Box textAlign="center">
        <Typography variant="h4">Tree Logged</Typography>
        <Typography variant="body1">John Doe logged the tree on 20th October 2010.</Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Tile</TableCell>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>
                {row.name}
              </TableCell>
              <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
    </Box>
    );
}

const planks = [
    { id: 1, name: 'Plank Ref', description: 'TTFS' },
    { id: 2, name: 'Width', description: '12cm' },
    { id: 3, name: 'Depth', description: '2cm' },
    { id: 4, name: 'Grade', description: '1' },
    { id: 5, name: 'Notes', description: 'Fresh and clean plank' },
    { id: 6, name: 'Location', description: 'Sawmill' }
  ];

export function SlideFour() {
    return (
        <Box textAlign="center">
        <Typography variant="h4">Sawmill</Typography>
        <Typography variant="body1">Jens Neyman milled the log on 20th October 2010.</Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Tile</TableCell>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>
                {row.name}
              </TableCell>
              <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
    </Box>
    );
}

export function SlideFive() {
    return (
        <Box textAlign="center">
            <Typography variant="h4">Drying Data</Typography>
            <Typography variant="body1">This will contain graph of drying data</Typography>
         
        </Box>
    );
}

// More slides can be defined in a similar way
