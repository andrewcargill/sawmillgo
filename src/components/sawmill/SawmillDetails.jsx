import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Button,
  Paper,
  Box,
  Divider,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import FlagIcon from "../country-components/FlagIcon";
import CountryNameFromCode from "../country-components/CountryNameFromCode";
import ReadOnlyMapWithPin from "../google-maps/ReadOnlyMapWithPin";
import { ImageCarousel } from "../image-components/SawmillImageGallery";
import FullImageModal from "../image-components/SawmillImageGallery";

const SawmillDetails = ({ sawmillId: propSawmillId }) => {
  const [sawmill, setSawmill] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSawmill = async () => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = propSawmillId || userLocalStorage?.sawmillId;

      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

      const sawmillRef = doc(db, `sawmill/${sawmillId}`);
      try {
        const sawmillDoc = await getDoc(sawmillRef);
        if (sawmillDoc.exists()) {
          setSawmill({ id: sawmillDoc.id, ...sawmillDoc.data() });
        } else {
          console.log("No such sawmill document!");
        }
      } catch (error) {
        console.error("Error fetching sawmill details: ", error);
      }
    };

    fetchSawmill();
  }, [db, propSawmillId]);

  const handleEditClick = () => {
    navigate("/edit-sawmill");
  };

  const openImageModal = (index) => {
    setSelectedImage(index);
    setOpenModal(true);
  };

  const closeImageModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      {sawmill ? (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", mb: 2 }}
            align="center"
          >
            Sawmill Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={3}>
            {/* Left Section: Text Details */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                {[
                  {
                    label: "Name",
                    value: sawmill.name,
                    backgroundColor: "action.hover",
                  },
                  {
                    label: "Owners",
                    value: sawmill.owners,
                    backgroundColor: "action.hover",
                  },
                  {
                    label: "Location",
                    value: sawmill.location,
                    backgroundColor: "action.hover",
                  },
                  {
                    label: "Description",
                    value: sawmill.description,
                    backgroundColor: "white",
                  },
                  {
                    label: "Forest Plan",
                    value: sawmill.forestPlan,
                    backgroundColor: "white",
                  },
                  {
                    label: "Contact Email",
                    value: sawmill.contactEmail,
                    backgroundColor: "white",
                  },
                  {
                    label: "Country",
                    value: (
                      <>
                        <FlagIcon countryCode={sawmill.country} />{" "}
                        <CountryNameFromCode countryCode={sawmill.country} />
                      </>
                    ),
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{
                      backgroundColor: item.backgroundColor,
                      borderRadius: 1,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {item.label}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {item.value}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
              {!propSawmillId && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleEditClick}
                  sx={{ mt: 3 }}
                >
                  Edit Sawmill
                </Button>
              )}
            </Grid>

            {/* Right Section: Map and Images */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" align="center" gutterBottom>
                  Location Map
                </Typography>
                <ReadOnlyMapWithPin location={sawmill.mapLocation} />
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Box>
                <Typography variant="h6" align="center" gutterBottom>
                  Images
                </Typography>
                <ImageCarousel
                  items={[
                    {
                      src: sawmill.imageURL1,
                      description: sawmill.imageDescription1,
                      altText: "Image 1",
                    },
                    {
                      src: sawmill.imageURL2,
                      description: sawmill.imageDescription2,
                      altText: "Image 2",
                    },
                    {
                      src: sawmill.imageURL3,
                      description: sawmill.imageDescription3,
                      altText: "Image 3",
                    },
                  ]}
                  openModal={openImageModal}
                />
              </Box>
            </Grid>
          </Grid>

          <FullImageModal
            isOpen={openModal}
            handleClose={closeImageModal}
            image={
              selectedImage !== null
                ? {
                    src: sawmill[`imageURL${selectedImage + 1}`],
                    description:
                      sawmill[`imageDescription${selectedImage + 1}`],
                    altText: `Image ${selectedImage + 1}`,
                  }
                : null
            }
          />
        </Paper>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          Loading sawmill details...
        </Typography>
      )}
    </Box>
  );
};

export default SawmillDetails;
