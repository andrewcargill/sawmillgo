import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const LogoutButton = () => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful');
    }).catch((error) => {
      // An error happened.
      console.error('Sign-out error', error);
    });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
