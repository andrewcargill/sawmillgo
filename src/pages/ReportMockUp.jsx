import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {
  FullImageModal,
  ImageCarousel,
} from "../components/image-components/ImageGalleryComponents";
import { PlankReportCarousel } from "../components/project-report/sub-components/PlankReportCarousel";
import {
  SlideFive,
  SlideFour,
  SlideOne,
  SlideThree,
  SlideTwo,
} from "../components/project-report/sub-components/PlankTestData";
import { app } from "../firebase-config";
import GoogleMapsReport from "../components/google-maps/GoogleMapsReport";
import image1 from "../media/images/1.png";
import image2 from "../media/images/2.png";
import image3 from "../media/images/3.png";
import image4 from "../media/images/4.png";
import image5 from "../media/images/5.png";

const ReportMockUp = () => {
  const { reportId } = useParams();
  const [reportData, setReportData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);

  const db = getFirestore(app);

  useEffect(() => {
    console.log("useEffect", reportId);
    const fetchReportData = async () => {
      const reportRef = doc(db, `public_reports`, reportId);
      const reportDoc = await getDoc(reportRef);
      if (reportDoc.exists()) {
        const reportData = reportDoc.data().reportData;
        console.log("Fetched report data:", reportData);
        setReportData(reportData);
      } else {
        console.log("No such document!");
      }
    };

    fetchReportData();
  }, [reportId, db]);

  const imageGalleryData = [
    {
      original: image1,
      thumbnail: "https://via.placeholder.com/150x100?text=Thumbnail+1",
      altText: "Image 1",
      date: "2024-05-05",
      title: "Title 1",
      description: "Finished table from the finest lumber.",
    },
    {
      original: image2,
      thumbnail: "https://via.placeholder.com/150x100?text=Thumbnail+1",
      altText: "Image 2",
      date: "2024-05-06",
      title: "Title 2",
      description: "High quality craftsmanship.",
    },
    {
      original: image3,
      thumbnail: "https://via.placeholder.com/150x100?text=Thumbnail+1",
      altText: "Image 3",
      date: "2024-05-07",
      title: "Title 3",
      description: "Unique design. A one of a kind piece.",
    },
    {
      original: image4,
      thumbnail: "https://via.placeholder.com/150x100?text=Thumbnail+1",
      altText: "Image 4",
      date: "2024-05-08",
      title: "Title 4",
      description: "2024-05-08: Cutting to size.",
    },
    {
      original: image5,
      thumbnail: "https://via.placeholder.com/150x100?text=Thumbnail+1",
      altText: "Image 4",
      date: "2024-05-08",
      title: "Title 4",
      description: "2024-05-08: Glueing the table top.",
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
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

  if (!reportData) return <div>Loading...</div>;

  return (
    <>
      <Grid container position="relative" top={-70} left={0}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            The Pine Table
          </Typography>
        </Grid>
        {/* product images */}
        <Grid item xs={12} style={{}}>
          <ImageCarousel items={imageGalleryData} openModal={openModal} />
          {modalIsOpen && (
            <FullImageModal
              isOpen={modalIsOpen}
              handleClose={closeModal}
              image={imageGalleryData[selectedImageIndex]}
            />
          )}
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
            Transparent Forestry - The Source of the Lumber
          </Typography>
        </Grid>
        {/* Google Maps API - Showing trees */}
        <Grid item xs={12}>
          <Paper>
            <GoogleMapsReport
              trees={reportData}
              getPlankBorderColor={getPlankBorderColor}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Specific lumber from trees
          </Typography>
          <Typography variant="body1" align="center">
            Selet 15 is a family run forest and sawmill that has been in
            operation since 1923. We are proud to offer the finest lumber from
            the most sustainable sources.
          </Typography>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            {reportData.map((tree, treeIndex) => (
              <Grid item xs={12} pt={1} pb={1} key={tree.refId}>
                {tree.logs.map((log, logIndex) => (
                  <div key={log.refId}>
                    {log.planks.map((plank, plankIndex) => (
                      <Accordion
                        key={plank.refId}
                        expanded={
                          expanded ===
                          `panel${treeIndex}-${logIndex}-${plankIndex}`
                        }
                        onChange={handleChange(
                          `panel${treeIndex}-${logIndex}-${plankIndex}`
                        )}
                      >
                        <AccordionSummary
                          expandIcon={<ArrowDownwardIcon />}
                          aria-controls={`panel${treeIndex}-${logIndex}-${plankIndex}-content`}
                          id={`panel${treeIndex}-${logIndex}-${plankIndex}-header`}
                        >
                          <Grid container xs={12} spacing={1}>
                            <Grid
                              item
                              xs={1}
                              bgcolor={getPlankBorderColor(treeIndex)}
                            ></Grid>
                            <Grid item xs={11}>
                              <Typography>PLANK REF: {plank.refId}</Typography>
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div>
                            <PlankReportCarousel
                              slides={[
                                (tree, plank) => <SlideOne tree={tree} plank={plank}/>,
                                (tree) => <SlideTwo tree={tree} />,
                                (tree, log) => <SlideThree log={log} />,
                                (tree, log, plank) => (
                                  <SlideFour plank={plank} />
                                ),
                                (tree, log, plank) => (
                                  <SlideFive
                                    moistureContent={plank.moistureContent}
                                  />
                                ),
                              ]}
                              tree={tree}
                              log={log}
                              plank={plank}
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </div>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportMockUp;
