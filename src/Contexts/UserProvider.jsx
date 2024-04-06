import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ id: null, email: null });

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser({ id: null, email: null });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
