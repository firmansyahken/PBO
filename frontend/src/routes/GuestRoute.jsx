import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuestRoute = (props) => {
    const { authUser } = useAuth();
    if(authUser) return <Navigate to="/"/>
    return props.children
}

export default GuestRoute