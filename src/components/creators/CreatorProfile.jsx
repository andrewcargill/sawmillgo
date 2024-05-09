import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase-config"; // Ensure you import your Firebase config appropriately

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
        <div>
            <h1>Creator Profile</h1>
            <p>Creator ID: {creatorId}</p>
            {creator && (
                <div>
                    <p>Username: {creator.username}</p>
                    <p>About: {creator.about}</p>
                </div>
            )}
        </div>
    );
};

export default CreatorProfile;
