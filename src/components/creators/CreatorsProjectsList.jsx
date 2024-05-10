import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ProjectDetailDialogue from "./projectDetailDialogue";


const CreatorsProjectsList = ({ userProfile }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProjectDeatils, setSelectedProjectDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const db = getFirestore();

    useEffect(() => {
        const fetchProjects = async () => {
            if (userProfile && userProfile.projects && userProfile.projects.length > 0) {
                const projectsData = await Promise.all(
                    userProfile.projects.map(async (project) => {
                        const projectRef = doc(db, `sawmill/${project.sawmillId}/projects/${project.projectId}`);
                        const docSnap = await getDoc(projectRef);
                        if (docSnap.exists()) {
                            // Combine Firestore data with the local 'sawmillName' from userProfile
                            return {
                                id: docSnap.id,
                                ...docSnap.data(),
                                sawmillName: project.sawmillName
                            };
                        } else {
                            console.log("No such project exists!");
                            return null;  // Return null if the document does not exist
                        }
                    })
                );
                setProjects(projectsData.filter(p => p !== null)); // Filter out null values in case some documents were not found
            }
        };

        fetchProjects();
    }, [userProfile]);

    function capitalizeWords(string) {
        return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const handleProjectClick = (project) => {
        setSelectedProjectDetails(project);
        setIsModalOpen(true);
    };
    

    return (
        <Grid container sx={{ justifyContent: { xs: "center", sm: "flex-start" } }} alignContent={"center"} p={2}>
            {projects.length > 0 ? (
                projects.map((project) => (
                    <Grid
                        className="item-select"
                        item
                        container
                        xs={12} sm={6} md={4} lg={3}  // Adjust grid sizing for better responsiveness
                        m={1}
                        key={project.id}
                        bgcolor={"white.main"}
                        style={{
                            border: "2px solid lightgrey",
                            borderRadius: "5px",
                            padding: "12px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => handleProjectClick(project)}
                    >
                        <Grid item>
                            <Typography variant="h6"> {capitalizeWords(project.sawmillName)}</Typography>
              
                        </Grid>
                        <Grid item>
                            <p>{project.projectName}</p>
                        </Grid>
                    </Grid>
                ))
            ) : (
                <p>No projects found.</p>
            )}

<Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <DialogTitle>Project Details</DialogTitle>
    <DialogContent>
      
        <ProjectDetailDialogue data={selectedProjectDeatils} />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
    </DialogActions>
</Dialog>

        </Grid>
    );
};

export default CreatorsProjectsList;
