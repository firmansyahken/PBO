import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = (props) => {
    const { authUser } = useAuth();
    if(!authUser) return <Navigate to="/login"/>
    return props.children
}

export default PrivateRoute