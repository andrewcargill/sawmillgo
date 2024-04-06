import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);


    const setUserProfileInfo = (profile) => {
        setUserProfile(profile);
    };

    const logoutUser = () => {
        setUserProfile(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ userProfile, logoutUser, setUserProfileInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
