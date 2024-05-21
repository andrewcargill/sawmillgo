import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ReportMoistureGraph from './ReportMoistureGraph';

export function SlideOne({ tree, plank }) {
    return (
        <Box textAlign="center">
            <Typography variant="h4">The journey of {plank.refIdß}</Typography>
            <Typography variant="body1">begins on {tree.date}</Typography>
         
        </Box>
    );
}



export function SlideTwo({ tree }) {

  const treeData = [
    { id: 1, name: 'Ref', description: tree.refId },
    { id: 2, name: 'age', description: tree.age },
    { id: 3, name: 'speices', description: tree.speciesName },
    { id: 4, name: 'Reason', description: tree.reason
     },
    { id: 5, name: 'Location', description: `Lat: ${tree.position.lat} Lng: ${tree.position.lng}` }
  ];
    return (
        <Box textAlign="center">
        <Typography variant="h4">Tree felled</Typography>
        <Typography variant="body1">{tree.lumberjackName} removed the tree. Here is the data we have:</Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Tile</TableCell>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {treeData.map((row) => (
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


export function SlideThree({ log }) {
  const logData = [
    { id: 1, name: 'Log Ref', description: log.refId },
    { id: 2, name: 'Lumberjack', description: log.lumberjackName },
    { id: 3, name: 'Length', description: `${log.length}cm` },
    { id: 4, name: 'Diameter', description: `${log.diameter}cm` },
    { id: 5, name: 'Location', description: log.locationName }
  ];
    return (
        <Box textAlign="center">
        <Typography variant="h4">Tree Logged</Typography>
        <Typography variant="body1">{log.lumberJack} logged the tree on 20th October 2010.</Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Title</TableCell>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logData.map((row) => (
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



export function SlideFour({ plank }) {
  const plankData = [
    { id: 1, name: 'Plank Ref', description: plank.refId },
    { id: 2, name: 'Milled Date', description: plank.date },
    { id: 3, name: 'Dimensions', description: `${plank.width}cm x ${plank.depth}cm x ${plank.length}cm` },

    { id: 4, name: 'Grade', description: plank.grade },
    { id: 5, name: 'Notes', description: plank.notes },
    
  ];
    return (
        <Box textAlign="center">
        <Typography variant="h4">Sawmill</Typography>
        <Typography variant="body1">{plank.operator} milled the log on 20th October 2010.</Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Tile</TableCell>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plankData.map((row) => (
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

export function SlideFive({ moistureContent }) {
    return (
        <Box textAlign="center">
            <Typography variant="h4">Drying Data</Typography>
            <ReportMoistureGraph plankData={moistureContent} />
        </Box>
    );
}

// More slides can be defined in a similar way
