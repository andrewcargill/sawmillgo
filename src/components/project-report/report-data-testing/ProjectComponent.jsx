import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Grid } from "@mui/material";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, addDoc, getFirestore } from "firebase/firestore";
import NotificationModal from './NotificationModal'; // Adjust the import path as needed
import { app } from "../../../firebase-config";
import TreeComponent from "./TreeComponenet";

const ProjectComponent = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    console.log("useEffect triggered. projectId:", projectId, "sawmillId:", sawmillId);
    
    const fetchProjectData = async () => {
      console.log("Fetching project data for projectId:", projectId, "and sawmillId:", sawmillId);
      const projectRef = doc(db, `sawmill/${sawmillId}/projects`, projectId);
      const projectDoc = await getDoc(projectRef);
      if (projectDoc.exists()) {
        const projectData = projectDoc.data();
        console.log("Project data:", projectData);
        setProject(projectData);
      } else {
        console.log("No such document!");
      }
    };

    fetchProjectData();
  }, [projectId, sawmillId]);

  const handleGenerateReport = async () => {
    console.log("Generating report...");
    if ((!project.plankRefIds || project.plankRefIds.length === 0) && 
        (project.logRefIds && project.logRefIds.length > 0) || 
        (project.treeRefIds && project.treeRefIds.length > 0)) {
      setShowNotification(true);
    } else if (!project.plankRefIds || project.plankRefIds.length === 0) {
      alert("No planks available for this project to generate a report.");
    } else {
      const data = await generateReport(projectId);
      setReportData(data);
    }
  };

  const generateReport = async (projectId) => {
    console.log("Generating report data...");
    const planks = await fetchPlanks(projectId);
    console.log("Fetched planks:", planks);
    const planksWithLogsAndTrees = await fetchLogsAndTrees(planks);
    console.log("Fetched logs and trees:", planksWithLogsAndTrees);
    const reportData = compileReportData(planksWithLogsAndTrees);
    console.log("Compiled report data:", reportData);

    const sanitizedReportData = removeUndefinedFields(reportData);
    console.log("Sanitized report data:", sanitizedReportData);

    try {
      // Create a new report document in the public_reports collection
      const reportRef = await addDoc(collection(db, `public_reports`), {
        projectId,
        reportData: sanitizedReportData,
        createdAt: new Date(),
      });

      console.log("Report document created successfully:", reportRef.id);

      // Optionally, you can update the project with a reference to the report document
      await updateDoc(doc(db, `sawmill/${sawmillId}/projects`, projectId), { reportId: reportRef.id });

      return sanitizedReportData;
    } catch (error) {
      console.error("Error creating report document:", error);
      throw error;
    }
  };

  const fetchPlanks = async (projectId) => {
    console.log("Fetching planks...");
    const projectRef = doc(db, `sawmill/${sawmillId}/projects`, projectId);
    const projectDoc = await getDoc(projectRef);
    if (projectDoc.exists()) {
      const projectData = projectDoc.data();
      console.log("Project data for planks:", projectData);
  
      const plankRefIds = projectData.plankRefIds;
      const planks = [];
  
      for (const plankRefId of plankRefIds) {
        const planksQuery = query(
          collection(db, `sawmill/${sawmillId}/planks`),
          where("refId", "==", plankRefId)
        );
        const querySnapshot = await getDocs(planksQuery);
        querySnapshot.forEach((doc) => {
          planks.push({ id: doc.id, ...doc.data() });
        });
      }
  
      console.log("Planks fetched:", planks);
      return planks;
    } else {
      console.log("No such project document for planks!");
      return [];
    }
  };

  const fetchLogsAndTrees = async (planks) => {
    console.log("Fetching logs and trees...");
    const logPromises = planks.map(async (plank) => {
      // Fetch the log using logId (which is actually log.refId)
      const logsQuery = query(
        collection(db, `sawmill/${sawmillId}/logs`),
        where("refId", "==", plank.logId)
      );
      const logsSnapshot = await getDocs(logsQuery);
      const logDoc = logsSnapshot.docs[0]; // Assume there's only one matching document
      const log = logDoc.data();
  
      // Fetch the tree using treeId (which is actually tree.refId)
      const treesQuery = query(
        collection(db, `sawmill/${sawmillId}/trees`),
        where("refId", "==", log.treeId)
      );
      const treesSnapshot = await getDocs(treesQuery);
      const treeDoc = treesSnapshot.docs[0]; // Assume there's only one matching document
      const tree = treeDoc.data();
  
      return {
        plank: removeUnnecessaryFields(plank, "plank"),
        log: { id: logDoc.id, ...removeUnnecessaryFields(log, "log") },
        tree: { id: treeDoc.id, ...removeUnnecessaryFields(tree, "tree") }
      };
    });
  
    const logsAndTrees = await Promise.all(logPromises);
    console.log("Logs and trees fetched:", logsAndTrees);
    return logsAndTrees;
  };

  const removeUnnecessaryFields = (data, type) => {
    const fieldsToKeep = {
      tree: ["refId", "date", "speciesName", "age", "reason", "lumberjackName", "latitude", "longitude", "image"],
      log: ["refId", "date", "length", "diameter", "lumberjackName", "milledDate"],
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

  const removeUndefinedFields = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => removeUndefinedFields(item));
    } else if (typeof data === 'object' && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        if (data[key] !== undefined) {
          acc[key] = removeUndefinedFields(data[key]);
        }
        return acc;
      }, {});
    }
    return data;
  };

  const compileReportData = (planksWithLogsAndTrees) => {
    console.log("Compiling report data...");
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

    console.log("Compiled report data:", reportData);
    return reportData;
  };

  const navigateToConversion = (path) => {
    setShowNotification(false);
    navigate(path); // Navigate to the desired conversion UI
  };

  if (!project) return <div>Loading...</div>;

  return (
    <Grid container>
      <Typography variant="h4">{project.projectName}</Typography>
      <Typography variant="body1">{project.projectInfo}</Typography>
      <Button variant="contained" color="primary" onClick={handleGenerateReport}>
        Generate Report
      </Button>

      <NotificationModal
        open={showNotification}
        handleClose={() => setShowNotification(false)}
        navigateTo={navigateToConversion}
      />

      {reportData && (
        <Grid container>
          {reportData.map((tree, index) => (
            <TreeComponent key={tree.refId} tree={tree} color={getPlankBorderColor(index)} />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

const getPlankBorderColor = (index) => {
  const colors = ["#FF5733", "#33FFB8", "#3361FF", "#F4FF33", "#8333FF"];
  return colors[index % colors.length];
};

export default ProjectComponent;
