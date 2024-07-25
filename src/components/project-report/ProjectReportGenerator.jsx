import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Grid } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import NotificationModal from './NotificationModal';
import { app } from "../../firebase-config";
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

const ProjectReportGenerator = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchProjectData = async () => {
      const projectRef = doc(db, `sawmill/${sawmillId}/projects`, projectId);
      const projectDoc = await getDoc(projectRef);
      if (projectDoc.exists()) {
        setProject(projectDoc.data());
      }
    };

    fetchProjectData();
  }, [projectId, sawmillId]);

  const handleGenerateReport = () => {
    if ((!project.plankRefIds || project.plankRefIds.length === 0) && 
        (project.logRefIds && project.logRefIds.length > 0) || 
        (project.treeRefIds && project.treeRefIds.length > 0)) {
      setShowNotification(true);
    } else if (!project.plankRefIds || project.plankRefIds.length === 0) {
      alert("No planks available for this project to generate a report.");
    } else {
      const reportUrl = `/productreport/${projectId}`;
      setQrUrl(reportUrl);
    }
  };

  const handleViewReport = () => {
    navigate(qrUrl);
  };

  const handleDownloadQRCode = () => {
    const qrCodeCanvas = document.getElementById("qrCode");
    html2canvas(qrCodeCanvas).then(canvas => {
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  if (!project) return <div>Loading...</div>;

  return (
    <Grid container>
      <Typography variant="h4">{project.projectName}</Typography>
      <Typography variant="body1">{project.projectInfo}</Typography>
      <Button variant="contained" color="primary" onClick={handleGenerateReport}>
        Generate Report
      </Button>

 

      {qrUrl && (
        <Grid container direction="column" alignItems="center" spacing={2} mt={4}>
          <Grid item>
            <QRCode id="qrCode" value={window.location.origin + qrUrl} size={256} />
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleDownloadQRCode}>
              Download QR Code
            </Button>
            <Button variant="contained" color="primary" onClick={handleViewReport}>
              View Report
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ProjectReportGenerator;
