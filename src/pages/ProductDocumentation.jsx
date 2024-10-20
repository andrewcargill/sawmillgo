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
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NatureIcon from "@mui/icons-material/Nature";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../firebase-config";
import treeLabelColors from "../components/project-report/treeLabelColors.json";
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
import CreatorContainer from "../components/project-report/sub-components/CreatorContainer";
import SawmillContainer from "../components/project-report/sub-components/SawmillContainer";
import certImage from "../media/images/cert-image3.png";

const ProductDocumentation = () => {
  const { sawmillId, projectId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [imageGalleryData, setImageGalleryData] = useState([]);
  const [creatorProfile, setCreatorProfile] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [sawmillName, setSawmillName] = useState("");

  const db = getFirestore(app);
  // const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchMoistureChecks = async (plankId) => {
      const moistureChecksRef = collection(
        db,
        `sawmill/${sawmillId}/planks/${plankId}/moistureChecks`
      );
      const moistureChecksSnapshot = await getDocs(moistureChecksRef);
      return moistureChecksSnapshot.docs.map((doc) => doc.data());
    };

    const fetchPlanks = async (projectId) => {
      const planksQuery = query(
        collection(db, `sawmill/${sawmillId}/planks`),
        where("projectId", "==", projectId)
      );
      const querySnapshot = await getDocs(planksQuery);
      const planks = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const plankData = doc.data();
          const moistureChecks = await fetchMoistureChecks(doc.id);
          return { ...plankData, moistureChecks };
        })
      );
      return planks;
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
          tree: { id: treeDoc.id, ...removeUnnecessaryFields(tree, "tree") },
        };
      });

      return (await Promise.all(logPromises)).filter((item) => item !== null);
    };

    const fetchCreatorProfileData = async (creatorId) => {
      const userRef = doc(db, `users`, creatorId);
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? userDoc.data() : null;
    };

    const fetchCreatorProjectData = async (creatorId, projectId) => {
      const projectRef = doc(
        db,
        `users/${creatorId}/detailedProjects`,
        projectId
      );
      const projectDoc = await getDoc(projectRef);

      if (!projectDoc.exists()) return null;

      const projectData = projectDoc.data();
      const postsQuery = collection(
        db,
        `users/${creatorId}/detailedProjects/${projectId}/posts`
      );
      const postsSnapshot = await getDocs(postsQuery);
      const posts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { ...projectData, posts };
    };

    const fetchSawmillName = async (sawmillId) => {
      const sawmillRef = doc(db, `sawmill`, sawmillId);
      const sawmillDoc = await getDoc(sawmillRef);
      console.log("sawmillDoc", sawmillDoc);
      if (sawmillDoc.exists()) {
        setSawmillName(sawmillDoc.data().name);
      }
    };

    const removeUnnecessaryFields = (data, type) => {
      const fieldsToKeep = {
        tree: [
          "refId",
          "date",
          "speciesName",
          "age",
          "reason",
          "lumberjackName",
          "latitude",
          "longitude",
          "image",
        ],
        log: [
          "refId",
          "date",
          "length",
          "diameter",
          "lumberjackName",
          "milledDate",
          "locationName",
        ],
        plank: [
          "refId",
          "date",
          "length",
          "width",
          "depth",
          "grade",
          "image1",
          "image2",
          "notes",
          "furniture",
          "construction",
          "liveEdge",
          "general",
          "moistureChecks", // Ensure moistureChecks is kept
        ],
      };

      const filteredData = {};

      fieldsToKeep[type].forEach((field) => {
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

    const compileReportData = (
      planksWithLogsAndTrees,
      creatorProfileData,
      creatorProjectData
    ) => {
      const reportData = planksWithLogsAndTrees.reduce((acc, item) => {
        const { plank, log, tree } = item;

        const existingTree = acc.find((t) => t.refId === tree.refId);
        if (existingTree) {
          const existingLog = existingTree.logs.find(
            (l) => l.refId === log.refId
          );
          if (existingLog) {
            existingLog.planks.push(plank);
          } else {
            existingTree.logs.push({ ...log, planks: [plank] });
          }
        } else {
          acc.push({
            ...tree,
            logs: [{ ...log, planks: [plank] }],
          });
        }

        return acc;
      }, []);

      return {
        creatorProfile: creatorProfileData,
        creatorProject: creatorProjectData,
        reportData,
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
        const creatorProfileData = await fetchCreatorProfileData(
          projectData.creatorId
        );
        const creatorProjectData = await fetchCreatorProjectData(
          projectData.creatorId,
          projectId
        );
        const compiledReportData = compileReportData(
          planksWithLogsAndTrees,
          creatorProfileData,
          creatorProjectData
        );

        setReportData(compiledReportData);
        setCreatorProfile(compiledReportData.creatorProfile);
        processImageGalleryData(compiledReportData);
        fetchSawmillName(sawmillId); // Fetch sawmill name
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
    const colors = treeLabelColors.colors;
    return colors[treeIndex % colors.length];
  };

  if (!reportData) return <div>Loading...</div>;

  return (
    <>
      <Grid container position="relative" top={0} left={0}>
        {/*Half Page image*/}
        <Grid xs={12} md={8} p={3}>
          <Grid item xs={12} pb={6}>
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
        </Grid>

        {/*Half Page Details*/}
        <Grid xs={12} md={4} p={4} alignContent={"left"}>
          <Grid item xs={12} pb={6}>
            <Typography variant="h2" align="left">
              {reportData.creatorProject?.title || "No Title"}
            </Typography>
          </Grid>
          <Grid container spacing={2} alignItems="center" pb={6}>
            <Grid item xs={12} m={1}>
              <Typography variant="body1" align="left">
                {reportData.creatorProject?.description || "No Description"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0} pb={6}>
            <Grid item xs={6}>
              <Grid item xs={12} m={1}>
                <Typography className="sacramento-regular" align="left">
                  Created by:
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                m={1}
                className="sacramento-regular"
                align="left"
              >
                {creatorProfile?.companyName || "No Username"}
              </Grid>
             
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} m={1}>
                <Typography className="sacramento-regular" align="left">
                  Wood Supplier:
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                m={1}
                className="sacramento-regular"
                align="left"
              >
                {sawmillName || "No Sawmill Name"}
              </Grid>
         
            </Grid>
            <Grid item xs={6} align='left'>
            <CreatorContainer creator={creatorProfile}  />
              </Grid>
            <Grid item xs={6} align='left'>
            <SawmillContainer sawmillId={sawmillId} />
              </Grid>
          </Grid>
        </Grid>

        {/*Certification*/}
        <Grid
          container
          p={2}
          color={"primary.contrastText"}
          justifyContent={"center"}
          mb={6}
        >
          <Paper elevation={5}>
            <Grid
              container
              p={4}
              style={{
                backgroundImage: `url(${certImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Grid item className="tangerine-bold">
                The Story Behind the Product
              </Grid>
              <Grid item pb={2}>
                <Typography variant="body1" align="left" pt={2}>
                  Understanding the origin of the wood used in your product is
                  essential for appreciating its true value. Our commitment to
                  sustainability and craftsmanship ensures that every piece of
                  wood is ethically sourced and meticulously processed. Let us
                  take you on a journey through the lifecycle of the wood that
                  makes your product unique.
                </Typography>
                <Typography variant="body1" align="left" pt={2}>
                  Transparency in sourcing is not just about ethical
                  responsibility; it is about honoring the trees, the
                  environment, and the artisans who transform raw wood into
                  beautiful products. By tracking the journey from forest to
                  finished product, we ensure that every step is documented and
                  shared with you.
                </Typography>
                <Typography variant="body1" align="left" pt={2}>
                  Our advanced tracking system records every detail from the
                  moment a tree is selected to the final product creation. This
                  system ensures complete transparency, allowing you to trace
                  the origins and journey of your wood. Our goal is to connect
                  you with the story behind your product.
                </Typography>
              </Grid>
              <Grid item container>
                <Typography variant="h6" align="left" pt={2}>
                  Certified Authencity of the Wood by:
                </Typography>
                <Grid
                  item
                  xs={12}
                  m={1}
                  className="sacramento-regular"
                  align="left"
                >
                  Andrew Cargill
                </Grid>
                <Typography variant="" align="left">
                  SAWMILL GO!
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

       

        {/*Google Maps*/}
        <Grid item xs={12} md={8} p={1}>
          <Paper elevation={3}>
            <Grid padding={4}>
              <Typography variant="h4" align="center">
                Interactive Tree Map
              </Typography>
              <GoogleMapsReport
                trees={reportData.reportData}
                getPlankBorderColor={getPlankBorderColor}
              />
            </Grid>
          </Paper>
        </Grid>

        <Grid container xs={12} md={4} p={1}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Plank Timeline
            </Typography>
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
                            <Grid item xs={4}>
                              <Chip
                                avatar={
                                  <Avatar>
                                    <NatureIcon />
                                  </Avatar>
                                }
                                label={`Tree ${treeIndex + 1}`}
                                style={{
                                  backgroundColor:
                                    getPlankBorderColor(treeIndex),
                                }}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant="h6" align="left">
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
                                    moistureChecks={plank.moistureChecks}
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
