import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState(localStorage.getItem("auth_token") || null);

    const value ={
        authUser, setAuthUser
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
