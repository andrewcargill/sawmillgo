import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config';

const UserProfileForm = () => {
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [role, setRole] = useState('guest'); // Default to 'guest'
  const [sawmillId, setSawmillId] = useState('');
  const [sawmills, setSawmills] = useState([]);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    // Fetch existing user profile
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username || '');
          setAbout(userData.about || '');
          setRole(userData.role || 'guest');
          setSawmillId(userData.sawmillId || '');
        }
      });
    }

    // Fetch sawmills for selection
    const fetchSawmills = async () => {
      const sawmillsQuery = query(collection(db, 'sawmill'));
      const querySnapshot = await getDocs(sawmillsQuery);
      const sawmillsData = [];
      querySnapshot.forEach((doc) => {
        sawmillsData.push({ id: doc.id, ...doc.data() });
      });
      setSawmills(sawmillsData);
    };

    fetchSawmills();
  }, [user, db]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure there's a user before attempting to save the profile
    if (!user) {
        alert('No user is currently signed in.');
        return;
    }

    const userProfile = {
      userId: user.uid, // Capture the user UID here
      username,
      about,
      role,
      sawmillId,
      // permissions, // Assuming you might reintroduce this later
    };

    setDoc(doc(db, 'users', user.uid), userProfile, { merge: true }) // Use merge to update existing doc or create a new one
      .then(() => {
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
        alert('Error updating profile.');
      });
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        About:
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </label>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="guest">Guest</option>
          <option value="admin">Admin</option>
          {/* Add other roles as needed */}
        </select>
      </label>
      <label>
        Sawmill:
        <select value={sawmillId} onChange={(e) => setSawmillId(e.target.value)}>
          <option value="">Select a Sawmill</option>
          {sawmills.map((sawmill) => (
            <option key={sawmill.id} value={sawmill.id}>{sawmill.name}</option>
          ))}
        </select>
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserProfileForm;
