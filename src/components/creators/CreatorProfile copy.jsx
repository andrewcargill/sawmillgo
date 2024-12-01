import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase-config"; // Ensure you import your Firebase config appropriately
import { Grid } from "@mui/material";
import { Update } from "@mui/icons-material";
import UpdateCreatorProfile from "./UpdateCreatorProfile";
import FlagIcon from "../country-components/FlagIcon";
import CountryNameFromCode from "../country-components/CountryNameFromCode";


const db = getFirestore(app); // Initialize Firestore

const CreatorProfile = () => {
    const { creatorId } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCreatorInfo = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "users", creatorId); // Assuming 'users' is your collection
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setCreator(docSnap.data());
                } else {
                    console.log("No such document!");
                    setError('No profile found for this creator.');
                }
            } catch (err) {
                console.error("Error fetching creator data:", err);
                setError('Failed to fetch data.');
            }
            setLoading(false);
        };

        fetchCreatorInfo();
    }, [creatorId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Creator Profile</h1>
                </Grid>
                <Grid item xs={12}>
                    <h3>{creator.companyName}</h3>
                </Grid>
                <Grid item xs={12}>
                    <img src={creator?.imageUrl} alt="Creator" />
                  <FlagIcon countryCode={creator.country} />
                </Grid>

                <Grid item xs={12}>
                    <p>Creator ID: {creatorId}</p>
                    
                </Grid>
                {creator && (
                    <Grid item xs={12}>
                        <div>
                            <p>Username: {creator.username}</p>
                            <p>About: {creator.about}</p>
                            <p>PortfolioUrl: {creator.portfolioUrl}</p>
                            <p>Social 1: {creator.socialMediaUrl1}</p>
                            <p>Social 2: {creator.socialMediaUrl2}</p>
                            <p>Country: <CountryNameFromCode countryCode={creator.country} />    </p>
                        </div>
                    </Grid>
                )}
                <UpdateCreatorProfile />
            </Grid>
            
        </>
    );
};

export default CreatorProfile;
