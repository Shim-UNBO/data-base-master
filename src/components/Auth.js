import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isMaster, setIsMaster] = useState(false);

    return (
        <UserContext.Provider value={{ isMaster, setIsMaster }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return UserProvider;
};
