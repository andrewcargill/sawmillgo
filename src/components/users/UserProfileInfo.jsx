import React, { useState, useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase-config';
import UserContext from '../../Contexts/UserContext';
import { Grid, TextField, Button, MenuItem } from '@mui/material';
import { set } from 'firebase/database';

const UserProfileInfo = () => {
  const [userprofile, setUserProfile] = useState('');
  const [localUser, setLocalUser] = useState(null);

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
          setUserProfile(userData);
        }
      });
    }
    const userData = localStorage.getItem("user");
    if (userData) {
      setLocalUser(JSON.parse(userData));
    }

  }, [user, db]);




  

  return (
    <Grid item xs={12}>
      <h2>User Profile Info</h2>
      name: {userprofile?.username}
      <br />
      about: {userprofile?.about}
      <br />
      role: {userprofile?.role}
      <br />
      Sawmill: {localUser?.sawmillName}
      <br />
      Image: <img src={userprofile?.imageUrl} alt={userprofile?.username} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
  

     </Grid>
  );
};

export default UserProfileInfo;
