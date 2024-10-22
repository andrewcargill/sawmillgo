import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Completed
import WorkIcon from '@mui/icons-material/Work'; // Ongoing
import UpdateIcon from '@mui/icons-material/Update'; // Smaller goals

const milestones = [
  { 
    title: 'MVP Goal', 
    description: "Completion of working software",
    date: 'Q1 2025', 
    status: 'IN PROGRESS', 
    details: 'The Google Cloud-based SawmillGo platform is being developed, including features like QR code generation, stock management, and reporting systems.' 
  },
  { 
    title: 'Current Goal', 
    description: "Feedback from user groups",
    date: 'Nov 2024', 
    status: 'IN PROGRESS', 
    details: 'Preparing test data and demos for user groups to feedback.' 
  },
  { 
    title: 'Current Goal', 
    description: "Styling and site design",
    date: 'Nov 2024', 
    status: 'IN PROGRESS', 
    details: 'Styling of various forms and creation of project information for website.' 
  },
  { 
    title: 'Milestone completed', 
    description: "QR code end report",
    date: 'October 2024', 
    status: 'COMPLETED', 
    details: 'QR code is generated which stores a unique URL linking to the selected project. Live testing is completed and working as intended.' 
  },
  { 
    title: 'Milestone completed', 
    description: "Dashboard",
    date: 'August 2024', 
    status: 'COMPLETED', 
    details: 'Landing page of sawmill login displays a quick search where users can quickly access stock. Widgets display key data and buttons to access main modules.' 
  },
  { 
    title: 'Milestone completed', 
    description: "Creators & projects",
    date: 'May 2024', 
    status: 'COMPLETED', 
    details: 'Created dedicated secure login for creators along with linking creators to active sawmill projects. Creators can add posts and unload product images and content specific to a project.' 
  },
  { 
    title: 'Milestone completed', 
    description: "User and Sawmill Profiles",
    date: 'Jan 2024', 
    status: 'COMPLETED', 
    details: 'Sawmills and users have profiles which will be used as part of the end product report.' 
  },
  { 
    title: 'Milestone completed', 
    description: "GPS and Interactive Mapping",
    date: 'Nov 2023', 
    status: 'COMPLETED', 
    details: 'Creation of a new module where sawmills can draw areas onto a map and store them. These locations are then places where stock can be allocated. The stystem automatically tracks the movement of stock between locations.' 
  },
  { 
    title: 'Milestone completed', 
    description: "End Report Generation",
    date: 'Oct 2023', 
    status: 'COMPLETED', 
    details: 'Using projects with allocated to stock to generate an end report showing the tree and log data from a plank along with all additional plank information.' 
  },
  { 
    title: 'Milestone completed', 
    description: "Projects",
    date: 'Aug 2023', 
    status: 'COMPLETED', 
    details: 'The project module is how a sawmill allocates and reserves stock for customers.' 
  },
  { 
    title: 'Milestone completed', 
    description: "Trees, logs, planks",
    date: 'July 2023', 
    status: 'COMPLETED', 
    details: 'Modules with save, edit, delete and view. This system allows for verified stock (system knows the tree) and unverified stock (logs and planks added without tree data).' 
  },
  { 
    title: 'Milestone completed', 
    description: "Sawmills & Users",
    date: 'June 2023', 
    status: 'COMPLETED', 
    details: 'Sawmills and User management and cloud storage complete. Designed to manage large numbers of sawmills and users.' 
  },
  { 
    title: 'Production Start', 
    description: "System architecture",
    date: 'May 2023', 
    status: 'COMPLETED', 
    details: 'Planning of the system and ensuring easy scaleability.' 
  },
  { 
    title: 'Evaluation', 
    description: "Planning of production software",
    date: 'Feb 2023', 
    status: 'COMPLETED', 
    details: 'After a season of using the system in the forest and sawmill the main system is designed.' 
  },
  { 
    title: 'Testing', 
    description: "Field testing and feedback",
    date: 'May 2022', 
    status: 'IN PROGRESS', 
    details: 'Testing the technology in a real sawmill and forest environment to rigorously test the concept.' 
  },
  { 
    title: 'Platform Completed', 
    description: "Ready for testing",
    date: 'March 2022', 
    status: 'COMPLETED', 
    details: 'Platform will test the tree, log and plank relationships and enable GPS and Image saving.' 
  },
  { 
    title: 'Creation of Test Platform', 
    description: "Research and programming",
    date: 'September 2021', 
    status: 'IN PROGRESS', 
    details: 'Building the initial test platform with a GitHub frontend and Django backend. This system was not easily scaleable but perfect for testing the idea.' 
  }
];

const StatusPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState({});

  const handleDialogOpen = (milestone) => {
    setCurrentMilestone(milestone);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const getIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircleIcon color="primary" />;
      case 'IN PROGRESS':
        return <WorkIcon color="dark" />;
      default:
        return <UpdateIcon />;
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: '40px 20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
       Project Milestones
      </Typography>

      {/* Milestones Timeline */}
      <Timeline position="alternate">
        {milestones.map((milestone, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              {milestone.date}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                {getIcon(milestone.status)}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography 
                variant="h6" 
                component="span" 
                onClick={() => handleDialogOpen(milestone)} 
                style={{ cursor: 'pointer', color: '#1976d2' }} // Clickable text
              >
                {milestone.title}
              </Typography>
              <Typography>{milestone.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {/* Dialog for Detailed Information */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{currentMilestone.description}</DialogTitle>
        <DialogContent>
          <Typography>{currentMilestone.details}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StatusPage;
