import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    // authorization logic
    // while auth is false, user is redirected to login screen
    let authenticated = false; 
    const token = localStorage.getItem('token')
    
    if(token){
       authenticated = true;
    }
    
    
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
}