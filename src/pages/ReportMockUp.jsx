import React, { useState } from "react";
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

const ReportMockUp = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageGalleryData = [
    {
      imageUrl: "https://via.placeholder.com/600x400?text=Image+1",
      altText: "Image 1",
      date: "2024-05-05",
      title: "Title 1",
      description: "Description for Image 1",
    },
    {
      imageUrl: "https://via.placeholder.com/600x400?text=Image+2",
      altText: "Image 2",
      date: "2024-05-06",
      title: "Title 2",
      description: "Description for Image 2",
    },
    {
      imageUrl: "https://via.placeholder.com/600x400?text=Image+3",
      altText: "Image 3",
      date: "2024-05-07",
      title: "Title 3",
      description: "Description for Image 3",
    },
    {
      imageUrl: "https://via.placeholder.com/600x400?text=Image+4",
      altText: "Image 4",
      date: "2024-05-08",
      title: "Title 4",
      description: "Description for Image 4",
    },
  ];


  const ArrowButton = ({ direction, onClick }) => {
    return (
      <Button
        onClick={onClick}
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          color: "black",
          zIndex: 100,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }
        }}
      >
        {direction === "left" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </Button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
    customPaging: () => (
      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(0, 0, 0, 0.5)" }}></div>
    )
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  return (
    <Grid container>
      {/* Item Title */}
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Report Title
        </Typography>
      </Grid>
      {/* product images */}
      <Grid item xs={12}>
      <div style={{ position: "relative" }}>
        <Slider {...settings}>
          {imageGalleryData.map((image, index) => (
            <div key={index} onClick={() => openModal(index)}>
              <img
                src={image.imageUrl}
                alt={image.altText}
                style={{ width: "100%", height: "auto", cursor: "pointer" }}
              />
            </div>
          ))}
        </Slider>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <div>
            <img
              src={imageGalleryData[selectedImageIndex].imageUrl}
              alt={imageGalleryData[selectedImageIndex].altText}
              style={{ width: "100%", height: "auto" }}
            />
            <h2>{imageGalleryData[selectedImageIndex].title}</h2>
            <p>{imageGalleryData[selectedImageIndex].description}</p>
            <Button onClick={closeModal}>Close Modal</Button>
          </div>
        </Modal>
      </div>
      </Grid>
      {/* Product Description and avatar */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={10}>
          {/* Product Description */}
          <Typography variant="h5">
            {/* Avatar beside Product Description title */}
            Product Description
          </Typography>
          <Typography variant="body1" align="left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </Grid>
      </Grid>

      {/* Tree section title */}
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Trees used in your product
        </Typography>
      </Grid>
      {/* Google Maps API - Showing trees */}
      <Grid item xs={12}>
        <Paper>
          <img src="https://via.placeholder.com/1200x300" alt="Hero Image" />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Specific lumber from trees
        </Typography>
      </Grid>

      {/* Planks List */}
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>XEFI</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>ZZEL</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default ReportMockUp;
