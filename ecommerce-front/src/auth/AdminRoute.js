import React, { Component } from "react";
import { Routes, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Routes
//         {...rest}
//         render={props =>
//             isAuthenticated() ? (
//                 <Component {...props} />
//             ) : (
//                 <Navigate
//                     to={{
//                         pathname: "/signin",
//                         state: { from: props.location }
//                     }}
//                 />
//             )
//         }
//     />
// );


const AdminRoute = ({ children }) => {
    return isAuthenticated() && isAuthenticated().user.role === 1 ? children : <Navigate to="/signin" />;
};

export default AdminRoute;
