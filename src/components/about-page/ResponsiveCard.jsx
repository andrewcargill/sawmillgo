import React from "react";
import { Card, Grid, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";

const ResponsiveCard = ({ image, text, title, imagePosition = "left" }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isImageLeft = imagePosition === "left";

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Grid
        container
        direction={isSmallScreen ? "column" : isImageLeft ? "row" : "row-reverse"}
        alignItems="center"
      >
        {/* Image Section */}
        <Grid item xs={12} md={4} padding={2}>
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              borderRadius: "8px",
              objectFit: "cover",
              maxHeight: isSmallScreen ? "130px" : "220px",
            }}
          />
        </Grid>

        {/* Text Section */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            textAlign: isSmallScreen ? "center" : "left", // Center text on small screens, left-align on larger screens
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: "10px" }}
            >
              {title}
            </Typography>
            <Typography variant="body1">{text}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ResponsiveCard;
