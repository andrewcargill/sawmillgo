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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
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
import GoogleMapsReport from "../components/google-maps/GoogleMapsReport";
import CustomBox from "../components/customContainers/CustomBox";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../firebase-config";

const ProductDocumentation = () => {
  const { projectId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [imageGalleryData, setImageGalleryData] = useState([]);
  const [creatorProfile, setCreatorProfile] = useState([]);
  const [reportData, setReportData] = useState(null);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    console.log('projectId: ', projectId);
    const fetchPlanks = async (projectId) => {
      const planksQuery = query(
        collection(db, `sawmill/${sawmillId}/planks`),
        where("projectId", "==", projectId)
      );
      const querySnapshot = await getDocs(planksQuery);
      return querySnapshot.docs.map(doc => doc.data());
    };

    const fetchLogsAndTrees = async (planks) => {
      const logPromises = planks.map(async (plank) => {
        const logsQuery = query(
          collection(db, `sawmill/${sawmillId}/logs`),
          where("refId", "==", plank.logId)
        );
        const logsSnapshot = await getDocs(logsQuery);
        const logDoc = logsSnapshot.docs[0];
        const log = logDoc.data();

        const treesQuery = query(
          collection(db, `sawmill/${sawmillId}/trees`),
          where("refId", "==", log.treeId)
        );
        const treesSnapshot = await getDocs(treesQuery);
        const treeDoc = treesSnapshot.docs[0];
        const tree = treeDoc.data();

        return {
          plank: removeUnnecessaryFields(plank, "plank"),
          log: { id: logDoc.id, ...removeUnnecessaryFields(log, "log") },
          tree: { id: treeDoc.id, ...removeUnnecessaryFields(tree, "tree") }
        };
      });

      return (await Promise.all(logPromises)).filter(item => item !== null);
    };

    const fetchCreatorProfileData = async (creatorId) => {
      const userRef = doc(db, `users`, creatorId);
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? userDoc.data() : null;
    };

    const fetchCreatorProjectData = async (creatorId, projectId) => {
      const projectRef = doc(db, `users/${creatorId}/detailedProjects`, projectId);
      const projectDoc = await getDoc(projectRef);

      if (!projectDoc.exists()) return null;

      const projectData = projectDoc.data();
      const postsQuery = collection(db, `users/${creatorId}/detailedProjects/${projectId}/posts`);
      const postsSnapshot = await getDocs(postsQuery);
      const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return { ...projectData, posts };
    };

    const removeUnnecessaryFields = (data, type) => {
      const fieldsToKeep = {
        tree: ["refId", "date", "speciesName", "age", "reason", "lumberjackName", "latitude", "longitude", "image"],
        log: ["refId", "date", "length", "diameter", "lumberjackName", "milledDate", "locationName"],
        plank: ["refId", "date", "length", "width", "depth", "grade", "image1", "image2", "notes", "furniture", "construction", "liveEdge", "general"]
      };

      const filteredData = {};

      fieldsToKeep[type].forEach(field => {
        if (data[field] !== undefined) {
          filteredData[field] = data[field];
        }
      });

      if (type === "tree") {
        filteredData.position = { lat: data.latitude, lng: data.longitude };
        delete filteredData.latitude;
        delete filteredData.longitude;
      }

      return filteredData;
    };

    const compileReportData = (planksWithLogsAndTrees, creatorProfileData, creatorProjectData) => {
      const reportData = planksWithLogsAndTrees.reduce((acc, item) => {
        const { plank, log, tree } = item;

        const existingTree = acc.find(t => t.refId === tree.refId);
        if (existingTree) {
          const existingLog = existingTree.logs.find(l => l.refId === log.refId);
          if (existingLog) {
            existingLog.planks.push(plank);
          } else {
            existingTree.logs.push({ ...log, planks: [plank] });
          }
        } else {
          acc.push({
            ...tree,
            logs: [{ ...log, planks: [plank] }]
          });
        }

        return acc;
      }, []);

      return {
        creatorProfile: creatorProfileData,
        creatorProject: creatorProjectData,
        reportData
      };
    };

    const processImageGalleryData = (reportData) => {
      const galleryData = [];

      if (reportData.creatorProject) {
        galleryData.push({
          original: reportData.creatorProject.imageUrl,
          thumbnail: reportData.creatorProject.imageUrl,
          altText: reportData.creatorProject.title,
          date: reportData.creatorProject.date,
          title: reportData.creatorProject.imageTitle,
          description: reportData.creatorProject.imageDescription,
        });
      }

      if (reportData.creatorProject && reportData.creatorProject.posts) {
        reportData.creatorProject.posts.forEach((post) => {
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
    };

    const fetchReportData = async () => {
      try {
        const projectRef = doc(db, `sawmill/${sawmillId}/projects`, projectId);
        const projectDoc = await getDoc(projectRef);

        if (!projectDoc.exists()) return;

        const projectData = projectDoc.data();
        const planks = await fetchPlanks(projectId);
        const planksWithLogsAndTrees = await fetchLogsAndTrees(planks);
        const creatorProfileData = await fetchCreatorProfileData(projectData.creatorId);
        const creatorProjectData = await fetchCreatorProjectData(projectData.creatorId, projectId);
        const compiledReportData = compileReportData(planksWithLogsAndTrees, creatorProfileData, creatorProjectData);

        setReportData(compiledReportData);
        setCreatorProfile(compiledReportData.creatorProfile);
        processImageGalleryData(compiledReportData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReportData();
  }, [db, projectId, sawmillId]);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }; 

  const getPlankBorderColor = (treeIndex) => {
    const colors = ["#FF5733", "#33FFB8", "#3361FF", "#F4FF33", "#8333FF"];
    return colors[treeIndex % colors.length];
  };

  if (!reportData) return <div>Loading...</div>;

  return (
    <>
      <Grid container position="relative" top={0} left={0}>
        <Grid item xs={12} pb={6}>
          <Typography variant="h2" align="center">
            {reportData.creatorProject?.title || "No Title"}
          </Typography>
        </Grid>
        <Grid item xs={12} pb={6} style={{}}>
          {imageGalleryData.length > 0 ? (
            <>
              <ImageCarousel items={imageGalleryData} openModal={openModal} />
              {modalIsOpen && (
                <FullImageModal
                  isOpen={modalIsOpen}
                  handleClose={closeModal}
                  image={imageGalleryData[selectedImageIndex]}
                >
                  <Typography variant="h6">
                    {imageGalleryData[selectedImageIndex].title}
                  </Typography>
                  <Typography variant="body2">
                    {imageGalleryData[selectedImageIndex].description}
                  </Typography>
                  <Typography variant="body2">
                    Date: {imageGalleryData[selectedImageIndex].date}
                  </Typography>
                </FullImageModal>
              )}
            </>
          ) : (
            <Typography>No images available</Typography>
          )}
        </Grid>
        <Grid container spacing={2} alignItems="center" pb={6}>
          <Grid item xs={12} m={1}>
            <Typography variant="body1" align="left">
              {reportData.creatorProject?.description || "No Description"}
            </Typography>
          </Grid>
          <Grid item xs={12} m={1}>
            <Avatar
              src={creatorProfile?.imageUrl || ""}
              alt={`avatar for creator called ${creatorProfile?.username || "No Name"}`}
            />
            <Typography variant="body1" fontWeight={500} align="left">
              {reportData.creatorProfile?.companyName || "No Company"} ({creatorProfile?.username || "No Username"}) {creatorProfile?.country || "No Country"}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} p={3}>
          <Typography variant="h5" align="center">
            <FingerprintIcon /> THE STORY BEHIND YOUR WOOD
          </Typography>
        </Grid>

        <Grid
          container
          p={3}
          bgcolor={"primary.main"}
          color={"primary.contrastText"}
          justifyContent={"center"}
          mb={6}
        >
          <Paper>
            <Grid container p={2}>
              <Typography variant="h5">
                Why is it important to know the source of your wood?
              </Typography>
              <Typography variant="body1" align="center" pt={1}>
                The product that you own is honest and transparent. It is made
                with craftmanship and care from the start to the end. We believe
                in promoting sustainable forestry and the importance of knowing
                where your wood comes from.
              </Typography>
              <Typography variant="body1" align="center" pt={1}>
                True sustainable forestry is selective cutting and encouraging
                mixed species forests. It is the practice of cutting down trees
                in a way that allows the forest to regenerate itself.
              </Typography>
              <Typography variant="body1" align="center" pt={1}>
                Clear-cut forestry is the practice of cutting down all the trees
                in an area. This is not sustainable and can lead to
                deforestation.
              </Typography>
            </Grid>
          </Paper>
        </Grid>
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
            {reportData.reportData?.map((tree, treeIndex) => (
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
                          expandIcon={<ExpandMoreIcon />}
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
                                  <SlideOne
                                    tree={tree}
                                    plank={plank}
                                    log={log}
                                  />
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
            )) || <Typography>No report data available</Typography>}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDocumentation;
