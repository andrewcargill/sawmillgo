import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Ensure this is the correct path to your Firebase config

const db = getFirestore(app);

const UserProfilesList = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        const fetchUserProfiles = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            const profiles = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserProfiles(profiles);
        };

        fetchUserProfiles();
    }, []);

    return (
        <div>
            <h2>User Profiles</h2>
            <ul>
                {userProfiles.map((profile) => (
                    <li key={profile.id}>
                        <div>
                            <img src={profile.imageUrl || 'default-profile.png'} alt={profile.username || 'User'} style={{width: '100px', height: '100px', objectFit: 'cover'}}/>
                            <h3>{profile.username}</h3>
                            <p>About: {profile.about}</p>
                            <p>Role: {profile.role}</p>
                            {/* Display other profile information as needed */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfilesList;
