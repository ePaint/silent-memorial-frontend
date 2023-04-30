import axios from 'axios';
import React, { createContext, useState, useContext } from "react";
import { useEffect } from 'react';

const SessionDataContext = createContext(null)
const SessionDataSetContext = createContext(null);

export function useSessionDataContext() {
    return useContext(SessionDataContext);
}

export function useSessionDataSetContext() {
    return useContext(SessionDataSetContext);
}

export function SessionDataProvider(props) {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <SessionDataContext.Provider value={{user: user, isAuthenticated: isAuthenticated, showLoginModal: showLoginModal}}>
            <SessionDataSetContext.Provider value={{setUser: setUser, setIsAuthenticated: setIsAuthenticated, setShowLoginModal: setShowLoginModal}}>
                {props.children}
            </SessionDataSetContext.Provider>
        </SessionDataContext.Provider>
    )
}
