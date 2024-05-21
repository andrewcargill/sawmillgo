import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import FullImageModal, {
  ImageCarousel,
} from "../components/image-components/ImageGalleryComponents";
import { PlankReportCarousel } from "../components/project-report/sub-components/PlankReportCarousel";
import {
  SlideFive,
  SlideFour,
  SlideOne,
  SlideSix,
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
import { set } from "firebase/database";
import CustomBox from "../components/customContainers/CustomBox";

const ReportMockUp = () => {
  const { reportId } = useParams();
  const [reportData, setReportData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [imageGalleryData, setImageGalleryData] = useState([]);
  const [creatorProfile, setCreatorProfile] = useState([]);

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
        setCreatorProfile(reportDoc.data().reportData.creatorProfile);
  
        // Process and set the image gallery data
        const galleryData = [];
  
        // Add the creator project data
        if (reportData.creatorProject) {
          galleryData.push({
            original: reportData.creatorProject.imageUrl,
            thumbnail: reportData.creatorProject.imageUrl,
            altText: reportData.creatorProject.title,
            date: reportData.creatorProject.date, // You might need to adjust this if date is available
            title: reportData.creatorProject.imageTitle,
            description: reportData.creatorProject.imageDescription,
          });
        }
  
        // Add the posts data
        if (reportData.creatorProject && reportData.creatorProject.posts) {
          reportData.creatorProject.posts.forEach(post => {
            galleryData.push({
              original: post.image,
              thumbnail: post.image,
              altText: post.title,
              date: post.date,
              title: post.title,
              description: post.description,
            });
          });
        }
  
        setImageGalleryData(galleryData);
      } else {
        console.log("No such document!");
      }
    };
  
    fetchReportData();
  }, [reportId, db]);
  


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
    {/* Creator Profile - container should be -70 when nav hidden */}
      <Grid container position="relative" top={0} left={0}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            {reportData.creatorProject.title}
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
             {reportData.creatorProject.description}
            </Typography>
          </Grid>
          <Grid item xs={12} m={1}>
                  {/* Creator Thumbnail */}
          <Avatar src={creatorProfile.imageUrl} alt={`avatar for creator called ${creatorProfile.username}`} />
      
            <Typography variant="h6" align="left">
             {reportData.creatorProfile.companyName} ({creatorProfile.username}) {creatorProfile.country}
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
              trees={reportData.reportData}
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
            {reportData.reportData.map((tree, treeIndex) => (
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
                              height={30}
                            ></Grid>
                            <Grid item xs={10}>
                              <Typography variant="h6">
                                PLANK {plank.refId}
                              
                              </Typography>
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div>
                            <PlankReportCarousel
                              slides={[
                                (tree, log, plank) => (
                                  <SlideOne tree={tree} plank={plank} log={log}/>
                                ),
                                (tree, log) => <SlideTwo tree={tree} />,
                                (tree, log) => <SlideThree log={log} />,
                                (tree, log, plank) => (
                                  <SlideFour plank={plank} />
                                ),
                                (tree, log, plank) => (
                                  <SlideFive plank={plank} />
                                ),
                                (tree, log, plank) => (
                                  <SlideSix
                                    moistureContent={plank.moistureContent}
                                  />
                                )
                               
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
        <Grid container p={3} bgcolor={'primary.main'} color={'primary.contrastText'}  justifyContent={'center'}>
      <Paper>
        <Typography variant="h5" align="center">
          Why is it important to know the source of your wood?
          </Typography>
          <Typography variant="body1" align="center" pt={1}>
            The product that you own is honest and transparent. It is made with craftmanship and care from the start to the end. We believe 
            in promoting sustainable forestry and the importance of knowing where your wood comes from. 
          </Typography>
          <Typography variant="body1" align="center" pt={1}>
           True sustainable forestry is selective cutting and encouraging mixed species forests. It is the practice of cutting down trees in a way that allows the forest to regenerate itself.
          </Typography>
          <Typography variant="body1" align="center" pt={1}>
          Clear-cut forestry is the practice of cutting down all the trees in an area. This is not sustainable and can lead to deforestation.         
</Typography>
        </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportMockUp;
