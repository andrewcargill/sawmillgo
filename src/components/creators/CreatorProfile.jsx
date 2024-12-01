import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase-config";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import FlagIcon from "../country-components/FlagIcon";
import CountryNameFromCode from "../country-components/CountryNameFromCode";
import UpdateCreatorProfile from "./UpdateCreatorProfile";

const db = getFirestore(app);

const CreatorProfile = () => {
  const { creatorId } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCreatorInfo = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "users", creatorId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCreator(docSnap.data());
        } else {
          setError("No profile found for this creator.");
        }
      } catch (err) {
        console.error("Error fetching creator data:", err);
        setError("Failed to fetch data.");
      }
      setLoading(false);
    };

    fetchCreatorInfo();
  }, [creatorId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 4, px: 2 }}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Creator Profile
        </Typography>
        <Divider />
      </Grid>

      {/* Profile Card */}
      <Grid item xs={12} md={6}>
        <Card
          elevation={3}
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <CardMedia
            component="img"
            height="200"
            image={creator?.imageUrl || "/default-profile.png"}
            alt="Creator"
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {creator?.companyName || "No Company Name"}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ gap: 1, mt: 1 }}
            >
              <FlagIcon countryCode={creator?.country} />
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  fontStyle: "italic",
                  fontWeight: "medium",
                }}
              ></Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Creator Details */}
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Creator Details
          </Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Username:</strong> {creator?.username || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>About:</strong>{" "}
              {creator?.about || "No information provided."}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Portfolio:</strong>{" "}
              <a
                href={creator?.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {creator?.portfolioUrl || "N/A"}
              </a>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Social Media 1:</strong>{" "}
              <a
                href={creator?.socialMediaUrl1}
                target="_blank"
                rel="noopener noreferrer"
              >
                {creator?.socialMediaUrl1 || "N/A"}
              </a>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Social Media 2:</strong>{" "}
              <a
                href={creator?.socialMediaUrl2}
                target="_blank"
                rel="noopener noreferrer"
              >
                {creator?.socialMediaUrl2 || "N/A"}
              </a>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Country:</strong>{" "}
              <CountryNameFromCode countryCode={creator?.country} />
            </Typography>
          </Box>
        </Card>
      </Grid>

      {/* Update Profile Section */}
      <Grid item xs={12}>
        <UpdateCreatorProfile />
      </Grid>
    </Grid>
  );
};

export default CreatorProfile;
