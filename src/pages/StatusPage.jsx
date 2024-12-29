import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Completed
import WorkIcon from "@mui/icons-material/Work"; // Ongoing
import UpdateIcon from "@mui/icons-material/Update"; // Smaller goals
import TreeIcon from "@mui/icons-material/Forest";

const milestones = [
  {
    title: "Full System Launch",
    description: "Go live with full system for market",
    date: "Q1 2027",
    status: "UPCOMING",
    details:
      "Launch the full platform to market with a solid user base and refined functionality.",
  },
  {
    title: "Pilot Program Start",
    description: "Begin pilot program with 4-5 sawmills and woodworkers",
    date: "Q1 2026",
    status: "UPCOMING",
    details:
      "Launch of pilot program to test and gather feedback from sawmill owners and creators to refine the product.",
  },

  {
    title: "Secure Funding",
    description: "Apply for and secure EU funding for further development",
    date: "Q4 2025",
    status: "UPCOMING",
    details:
      "Seek grants and funding to support full development and real-life testing.",
  },
  {
    title: "MVP Goal",
    description: "Completion of working software",
    date: "Q1 2025",
    status: "UPCOMING",
    details:
      "The Google Cloud-based SawmillGo platform is being developed, including features like QR code generation, stock management, and reporting systems.",
  },
  {
    title: "Current Goal",
    description: "Feedback from user groups",
    date: "Dec 2024",
    status: "IN PROGRESS",
    details: "Preparing test data and demos for user groups to feedback.",
  },
  {
    title: "Milestone completed",
    description: "Development of Styling and site design",
    date: "Nov 2024",
    status: "COMPLETED",
    details:
      "Styling of various forms and creation of project information for website. The adding of information pages for site visitors and introduction videos."
  },
  {
    title: "Milestone completed",
    description: "Development of QR code end report",
    date: "October 2024",
    status: "COMPLETED",
    details:
      "QR code is generated which stores a unique URL linking to the selected project. Live testing is completed and working as intended.",
  },
  {
    title: "Milestone completed",
    description: "Development of Dashboard",
    date: "August 2024",
    status: "COMPLETED",
    details:
      "Landing page of sawmill login displays a quick search where users can quickly access stock. Widgets display key data and buttons to access main modules.",
  },
  {
    title: "Milestone completed",
    description: "Development of Creators & projects",
    date: "May 2024",
    status: "COMPLETED",
    details:
      "Created dedicated secure login for creators along with linking creators to active sawmill projects. Creators can add posts and unload product images and content specific to a project.",
  },
  {
    title: "Milestone completed",
    description: "Development of User and Sawmill Profiles",
    date: "Jan 2024",
    status: "COMPLETED",
    details:
      "Sawmills and users have profiles which will be used as part of the end product report.",
  },
  {
    title: "Milestone completed",
    description: "Development of GPS and Interactive Mapping",
    date: "Nov 2023",
    status: "COMPLETED",
    details:
      "Creation of a new module where sawmills can draw areas onto a map and store them. These locations are then places where stock can be allocated. The stystem automatically tracks the movement of stock between locations.",
  },
  {
    title: "Milestone completed",
    description: "Development of End Report Generation",
    date: "Oct 2023",
    status: "COMPLETED",
    details:
      "Using projects with allocated to stock to generate an end report showing the tree and log data from a plank along with all additional plank information.",
  },
  {
    title: "Milestone completed",
    description: "Development of Projects module",
    date: "Aug 2023",
    status: "COMPLETED",
    details:
      "The project module is how a sawmill allocates and reserves stock for customers.",
  },
  {
    title: "Milestone completed",
    description: "Development of core modules",
    date: "July 2023",
    status: "COMPLETED",
    details:
      "Tree, log and plank modules with save, edit, delete and view functionality. This system allows for verified stock (system knows the tree) and unverified stock (logs and planks added without tree data).",
  },
  {
    title: "Milestone completed",
    description: "Development of Sawmills & Users",
    date: "June 2023",
    status: "COMPLETED",
    details:
      "Sawmills and User management and cloud storage complete. Designed to manage large numbers of sawmills and users.",
  },
  {
    title: "Production Start",
    description: "Development of System architecture",
    date: "May 2023",
    status: "COMPLETED",
    details: "Planning of the system and ensuring easy scaleability.",
  },
  {
    title: "Evaluation",
    description: "Planning of production software",
    date: "Feb 2023",
    status: "COMPLETED",
    details:
      "After a season of using the system in the forest and sawmill the main system is designed.",
  },
  {
    title: "Testing",
    description: "Field testing and feedback",
    date: "May 2022",
    status: "COMPLETED",
    details:
      "Testing the technology in a real sawmill and forest environment to rigorously test the concept.",
  },

  {
    title: "Creation of Test Platform",
    description: "Research and programming",
    date: "September 2021",
    status: "COMPLETED",
    details:
      "Building the initial test platform with a GitHub frontend and Django backend. This system was not easily scaleable but perfect for testing the idea.",
  },
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
      case "COMPLETED":
        return <CheckCircleIcon color="primary" />;
      case "IN PROGRESS":
        return <WorkIcon color="secondary" />;
      default:
        return <UpdateIcon color="primary" />;
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: "40px 20px" }}>
      {/* Project Status Section */}
      <Grid container spacing={4} style={{ marginBottom: "40px" }}>
        <Grid item xs={12}>
          {/* <Grid item xs={12} sx={{ mb: 2 }} className="fade-in-1">
            <Typography variant="h4" align="center" color="primary">
              Project Status
            </Typography>
          </Grid> */}
          <Card elevation={4} sx={{ p: 3 }}>
  <CardContent>
    {/* Current Focus Section with Tree Icon */}
    <Box sx={{ mb: 2, textAlign: "center" }}>
      <TreeIcon sx={{ color: "#79c000", fontSize: 40, mb: 1 }} /> {/* Tree Icon above */}
      <Typography variant="h6" color="text.primary" gutterBottom>
        Current Focus
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ pl: 4 }}>
        Completing SawmillGo’s core software for investment and testing by early 2025.
      </Typography>
    </Box>

    {/* Key 2025 Milestones */}
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Key 2025 Milestones
      </Typography>
      <Box sx={{ pl: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Finalize MVP testing with user feedback.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Implement essential product features based on user and market feedback.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Begin pilot program with select sawmills and creators.
        </Typography>
      </Box>
    </Box>

    {/* Opportunities for Engagement */}
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Opportunities for Engagement
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We’re seeking partners interested in supporting sustainable forestry tech through funding or direct involvement in our pilot program.
      </Typography>
    </Box>

    {/* Call to Action Button */}
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        href="/contact"  // Assuming there's a Contact page
      >
        Contact Us
      </Button>
    </Box>
  </CardContent>
</Card>

        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mb: 2 }} className="fade-in-1">
        <Typography variant="h5" align="center" color="primary">
          Project Timeline
        </Typography>
      </Grid>

      {/* Timeline with Hover Effect */}
      <Timeline position="alternate">
        {milestones.map((milestone, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              variant="body2"
              color="text.secondary"
            >
              {milestone.date}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                sx={{
                  backgroundColor: "#ffffff",
                }}
              >
                {getIcon(milestone.status)}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            {/* Wrapping TimelineContent in a clickable Box */}
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Box
                onClick={() => handleDialogOpen(milestone)}
                sx={{
                  "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" },
                  borderRadius: 1,
                  padding: 1,
                }}
              >
                <Typography variant="h6" component="span" color="black">
                  {milestone.title}
                </Typography>
                <Typography>{milestone.description}</Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {/* Styled Dialog with Details */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "primary.main",
            fontWeight: "bold",
          }}
        >
          {getIcon(currentMilestone.status)} {currentMilestone.title}
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{ fontSize: "0.9rem", color: "text.secondary", mb: 1 }}
          >
            {currentMilestone.date}
          </Typography>
          <Typography variant="h6" sx={{ color: "black", fontWeight: "500" }}>
            {currentMilestone.description}
          </Typography>
          <Typography sx={{ mt: 1 }}>{currentMilestone.details}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} sx={{ color: "primary.main" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StatusPage;
