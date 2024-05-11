import React, { useState, useEffect } from 'react';
import {addDoc, collection, getDoc, doc, setDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../../firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import PostCreator from './PostCreator';
import PostsList from './PostsList';

const ProductForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const db = getFirestore(app);
    const { projectId } = useParams();

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUserId(user.uid); // Set the user ID from the Firebase user object
                fetchProjectDetails(user.uid); // Fetch project details after setting the userId
            } else {
                setUserId(null);
                setTitle(''); // Clear title if no user is logged in
                setDescription(''); // Clear description if no user is logged in
            }
        });

        return () => unsubscribe(); // Clean up the subscription
    }, []);

    const fetchProjectDetails = async (uid) => {
        if (uid && projectId) {
            const projectDocRef = doc(db, `users/${uid}/detailedProjects/${projectId}`);
            try {
                const docSnap = await getDoc(projectDocRef);
                if (docSnap.exists()) {
                    const projectData = docSnap.data();
                    setTitle(projectData.title || '');
                    setDescription(projectData.description || '');
                } else {
                    console.log("No such project!");
                }
            } catch (error) {
                console.error("Failed to fetch project details: ", error);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submit action
        if (!userId) {
            alert('No user logged in.'); // Alert if no user ID is available
            return; // Stop the function if no user is logged in
        }
    
        // Define the Firestore document reference for the project details
        const projectDocRef = doc(db, `users/${userId}/detailedProjects/${projectId}`);
    
        try {
            // Attempt to set the document with title and description
            await setDoc(projectDocRef, {
                title,
                description
            }, { merge: true }); // Use merge to avoid overwriting other fields that might exist
    
            // Notify the user of successful update
            alert('Product information created successfully.');
        } catch (error) {
            // Log any errors to the console and alert the user
            console.error('Error creating product info: ', error);
            alert('Failed to create product information.');
        }
    };
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Product Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <button type="submit">Save Product Info</button>
        </form>
         <PostCreator db={db} userId={userId} projectId={projectId} />
         <PostsList db={db} userId={userId} projectId={projectId} />
        </>
    );
};

export default ProductForm;
