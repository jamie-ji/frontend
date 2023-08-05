import { Outlet, Navigate } from 'react-router-dom'; 
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
    // console.log('PrivateRoutes Works!')
    let user = useContext(AuthContext).user

    // console.log('user: ', user)
    
    return (
        user !== null ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;