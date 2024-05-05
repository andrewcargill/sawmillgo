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
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Slider from "react-slick";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";

import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'; // Import default styles


const ReportMockUp = ({ onLoad, onUnload }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);

  const imageGalleryData = [
    {
      original: 'https://via.placeholder.com/600x400?text=Image+1',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumbnail+1',
      altText: "Image 1",
      date: "2024-05-05",
      title: "Title 1",
      description: "Description for Image 1",
    },
    {
      original: 'https://via.placeholder.com/600x400?text=Image+1',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumbnail+1',
      altText: "Image 2",
      date: "2024-05-06",
      title: "Title 2",
      description: "Description for Image 2",
    },
    {
      original: 'https://via.placeholder.com/600x400?text=Image+1',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumbnail+1',
      altText: "Image 3",
      date: "2024-05-07",
      title: "Title 3",
      description: "Description for Image 3",
    },
    {
      original: 'https://via.placeholder.com/600x400?text=Image+1',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumbnail+1',
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
    slidesToScroll: 1
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  return (
   <>
   
    <Grid 
    container 
    position="relative" 
    top={-70} 
    left={0} 
    
    >
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
            This product is made from the finest lumber and was handcrafted by 'Artisan Name'. 
            It is a beautiful piece of furniture that will last for generations.
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
        <Paper>
      GOOGLE MAPS API HERE
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Specific lumber from trees
        </Typography>
      </Grid>

      {/* Planks List */}
      <Grid item xs={12}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>XEFI</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
            lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>ZZEL</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
            lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>ZZEL</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
            lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
    </>
  );
};

export default ReportMockUp;
