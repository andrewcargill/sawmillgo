import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "../../firebase-config"; // Ensure this is the correct path to your Firebase config

const db = getFirestore(app);

const UserProfilesList = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  const fetchSawmillName = async (sawmillId) => {
    const docRef = doc(db, "sawmill", sawmillId); // Correct path to sawmill document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().name; // Return the sawmill's name
    } else {
      return "Unknown Sawmill"; // Fallback value
    }
  };

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const profiles = [];
      for (const doc of querySnapshot.docs) {
        const userData = doc.data();
        // Fetch the sawmill name for each user
        const sawmillName = await fetchSawmillName(userData.sawmillId);
        profiles.push({
          id: doc.id,
          ...userData,
          sawmillName, // Add the fetched sawmill name to the user profile object
        });
      }
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
              <img
                src={profile.imageUrl || "default-profile.png"}
                alt={profile.username || "User"}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h3>{profile.username}</h3>
              <p>About: {profile.about}</p>
              <p>Role: {profile.role}</p>
              <p>Sawmill: {profile.sawmillName}</p>
              {/* Display other profile information as needed */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfilesList;
