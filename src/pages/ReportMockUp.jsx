import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Button,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import default styles
import reportTestData from "../reportTestData";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ParkIcon from '@mui/icons-material/Park';
import DehazeIcon from '@mui/icons-material/Dehaze';


const ReportMockUp = ({ onLoad, onUnload }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);

  const imageGalleryData = [
    {
      original: "https://via.placeholder.com/600x400?text=Image+1",
      thumbnail: "https://via.placeholder.com/150x100?text=Thumbnail+1",
      altText: "Image 1",
      date: "2024-05-05",
      title: "Title 1",
      description: "Description for Image 1",
    },
    {
      original: "https://via.placeholder.com/600x400?text=Image+1",
      thumbnail: "https://via.placeholder.com/150x100?text=Thumbnail+1",
      altText: "Image 2",
      date: "2024-05-06",
      title: "Title 2",
      description: "Description for Image 2",
    },
    {
      original: "https://via.placeholder.com/600x400?text=Image+1",
      thumbnail: "https://via.placeholder.com/150x100?text=Thumbnail+1",
      altText: "Image 3",
      date: "2024-05-07",
      title: "Title 3",
      description: "Description for Image 3",
    },
    {
      original: "https://via.placeholder.com/600x400?text=Image+1",
      thumbnail: "https://via.placeholder.com/150x100?text=Thumbnail+1",
      altText: "Image 4",
      date: "2024-05-08",
      title: "Title 4",
      description: "2024-05-08: Description for Image 4",
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  useEffect(() => {
    onLoad(); // Call onLoad when component mounts
    return () => {
      onUnload(); // Call onUnload when component unmounts
    };
  }, [onLoad, onUnload]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getPlankBorderColor = (treeIndex) => {
    const colors = ["#FF5733", "#33FFB8", "#3361FF", "#F4FF33", "#8333FF"];
    return colors[treeIndex % colors.length];
  };
  

  return (
    <>
      <Grid container position="relative" top={-70} left={0}>
        {/* Item Title */}
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            The Peace Chair
          </Typography>
        </Grid>
        {/* product images */}
        <Grid item xs={12}>
          <ReactImageGallery
            items={imageGalleryData}
            showNav={true} // Show navigation arrows
            showThumbnails={false} // Show thumbnails
            showFullscreenButton={true} // Show fullscreen button
            showPlayButton={false} // Show play button
          />
        </Grid>
        {/* Product Description and avatar */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} m={1}>
            {/* Product Description */}

            <Typography variant="body1" align="left">
              This product is made from the finest lumber and was handcrafted by
              'Artisan Name'. It is a beautiful piece of furniture that will
              last for generations.
            </Typography>
          </Grid>
        </Grid>

        {/* Tree section title */}
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Transparent Forestry
          </Typography>
        </Grid>
        {/* Google Maps API - Showing trees */}
        <Grid item xs={12}>
          <Paper>GOOGLE MAPS API HERE</Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Specific lumber from trees
          </Typography>
        </Grid>

       
        {/* TEST */}
        <Grid container>
        <Grid item xs={12}>
          {reportTestData.map((tree, index) => (
            <Accordion
              key={tree.id}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <ParkIcon />
                <Typography>{tree.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  {tree.logs.map((log) => (
                    <Grid item xs={12} key={log.id}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ArrowDropDownIcon />}
                          aria-controls="panel2-content"
                          id="panel2-header"
                        >
                            <WorkspacesIcon />
                          <Typography>{log.id}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={1}>
                            {log.planks.map((plank) => (
                              <Grid item xs={12} key={plank.id}>
                                <Paper
                                  style={{
                                    border: `2px solid ${getPlankBorderColor(
                                      index
                                    )}`,
                                    padding: "10px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <DehazeIcon />
                                  <Typography>{plank.id}</Typography>
                                </Paper>
                              </Grid>
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>



          {/* <Grid item xs={12}>
            {reportTestData.map((tree, index) => (
              <Accordion
                key={tree.id}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography>{tree.id}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{tree.reasonForRemoval}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

export default ReportMockUp;
