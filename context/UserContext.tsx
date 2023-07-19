'use client';
import React, {createContext, useContext, useState} from 'react';

interface UserContextData {
    docNumber: string;
    setDocNumber: (docNumber: string) => void;
}

interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [docNumber, setDocNumber] = useState("");

    return (
        <UserContext.Provider value={{docNumber, setDocNumber}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextData => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};
