// ImageGalleryComponents.jsx
import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Modal,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";

export function ImageCarousel({ items, openModal }) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs")); // up to 600px
  const sm = useMediaQuery(theme.breakpoints.up("sm")); // 600px to 960px
  const md = useMediaQuery(theme.breakpoints.up("md")); // 960px to 1280px
  const lg = useMediaQuery(theme.breakpoints.up("lg")); // 1280px to 1920px

  return (
    <div>
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible={true}
        fullHeightHover={false}
        indicators={true}
        autoPlay={false}
        duration={1000}
      >
        {/* high controlled via css class */}
        {items.map((item, index) => (
          <Grid
            className="report-image-carousel"
            key={item.original}
            style={{
              width: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              cursor: "pointer",
              background: `url(${item.original}) center center / cover no-repeat`,
            }}
            onClick={() => openModal(index)}
            elevation={10}
          >
            {/* <img
            className="report-image-carousel"
            src={item.original}
            alt={item.altText}
           
 
          /> */}
          </Grid>
        ))}
      </Carousel>
    </div>
  );
}

// export function FullImageModal({ isOpen, handleClose, image }) {
//   return (
//     <Modal
//       open={isOpen}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           bgcolor: "background.paper",
//           border: "2px solid #000",
//           boxShadow: 24,
//           p: 2,
//           outline: 0,
//         }}
//       >
//         <IconButton
//           onClick={handleClose}
//           style={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <img
//           src={image.original}
//           alt={image.altText}
//           style={{ width: "100%", height: "auto" }}
//         />
//       </Box>
//     </Modal>
//   );
// }



const FullImageModal = ({ isOpen, handleClose, image }) => {
  return (
    <Modal open={isOpen} 
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          outline: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", right: 8, bottom: 8 }}
        >
              <CloseIcon />
         </IconButton>
         <Grid bgcolor={'lightgrey'} p={1} style={{ position: "absolute", top: 8, width: '100%', opacity: 0.8 }}>
         <Typography  variant="h6" >{image.date ? image.date : ''}</Typography>
         </Grid>
        
        <img src={image.original} alt={image.altText} style={{ maxWidth: "90vw", height: "auto" }} />
        <Typography variant="h6" mt={2}> {image.title}</Typography>
        <Typography variant="body1" mt={1}>{image.description}</Typography>
      </Box>
    </Modal>
  );
};

export default FullImageModal;

