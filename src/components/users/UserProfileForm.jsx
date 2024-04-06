import React, { useState, useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase-config';
import UserContext from '../../Contexts/UserContext';

const UserProfileForm = () => {
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [role, setRole] = useState('guest'); // Default to 'guest'
  const [sawmillId, setSawmillId] = useState('');
  const [sawmills, setSawmills] = useState([]);
  const [image, setImage] = useState(null);

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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      // Ensure there's a user before attempting to save the profile
      if (!user) {
          alert('No user is currently signed in.');
          return;
      }
  
      // Handle image upload if an image has been selected
      if (image) {
          const storage = getStorage(app);
          // Create a storage reference - you can use the user's uid for a unique filename
          const storageRef = ref(storage, `profileImages/${user.uid}/${image.name}`);
          try {
              const snapshot = await uploadBytes(storageRef, image);
              const downloadURL = await getDownloadURL(snapshot.ref);
              console.log('Uploaded a blob or file!', downloadURL);
              
              // Proceed to update the user's profile with the new image URL
              const userProfile = {
                  userId: user.uid,
                  username,
                  about,
                  role,
                  sawmillId,
                  imageUrl: downloadURL, // Add the download URL to the user's profile
              };

  
              await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });
              alert('Profile updated successfully!');
  
          } catch (error) {
              console.error("Error uploading image: ", error);
              alert('Error updating profile.');
              return;
          }
      } else {
          // Proceed without image upload if no image is selected
          const userProfile = {
              userId: user.uid,
              username,
              about,
              role,
              sawmillId,
              //imageUrl: previousImageUrl, // Optionally handle keeping the previous image URL if needed
          };
  
          try {
              await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });
              alert('Profile updated successfully!');
          } catch (error) {
              console.error("Error updating profile: ", error);
              alert('Error updating profile.');
          }
      }
  };
  

  return (
    <form onSubmit={handleSubmit}>
           <h2>User Profile</h2>
        <div>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      </div>
        <div>
      <label>
        About:
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </label>
        </div>
        <div>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="guest">Guest</option>
          <option value="admin">Admin</option>
          {/* Add other roles as needed */}
        </select>
      </label>
        </div>
        <div>
      <label>
        Image:
        <input type="file" onChange={handleImageChange} />
      </label>
        </div>
        <div>
      <label>
        Sawmill:
        <select value={sawmillId} onChange={(e) => setSawmillId(e.target.value)}>
          <option value="">Select a Sawmill</option>
          {sawmills.map((sawmill) => (
            <option key={sawmill.id} value={sawmill.id}>{sawmill.name}</option>
          ))}
        </select>
      </label>
        </div>
        <div>
      <button type="submit">Update Profile</button>
        </div>
    </form>
  );
};

export default UserProfileForm;
