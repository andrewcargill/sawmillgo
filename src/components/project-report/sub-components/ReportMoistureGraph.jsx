import React, { useEffect, useState } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FitScreenIcon from '@mui/icons-material/FitScreen';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { date, moistureContent } = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WaterDropIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={date} secondary={`${moistureContent}%`} />
          </ListItem>
        </List>
      </div>
    );
  }
  return null;
};

const FullScreenCustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { date, moistureContent } = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WaterDropIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={date} secondary={`${moistureContent}%`} />
          </ListItem>
        
        </List>
      </div>
    );
  }
  return null;
};

const ReportMoistureGraph = ({ plankData }) => {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (plankData) {
      // Sort plankData by date
      const sortedData = [...plankData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setData(sortedData);
      console.log("moisture content", sortedData);
    }
  }, [plankData]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Grid container justifyContent="center">
        <ResponsiveContainer width="100%" height={160}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={false} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="moistureContent"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
      <Grid container justifyContent="center" mt={2}>
        <IconButton onClick={handleDialogOpen}>
          <FitScreenIcon fontSize="large" />
        </IconButton>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Moisture Content Over Time</DialogTitle>
        <DialogContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<FullScreenCustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="moistureContent"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportMoistureGraph;
