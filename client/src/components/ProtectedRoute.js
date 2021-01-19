import React from "react";
import { Redirect } from "react-router-dom";
import Authenticate from "../utils/Authentication";

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        let isAuthenticated = Authenticate();
        // const parseJwt = (token) => {
        //     try {
        //       return JSON.parse(atob(token.split('.')[1]));
        //     } catch (e) {
        //       return null;
        //     }
        //   };
        // const token = JSON.parse(localStorage.getItem("token"));
        // if (!token) {
        //     isAuthenticated = false;
        // } else {
        //     const parsedToken = parseJwt(token);
        //     if (Date.now() <= parsedToken.exp * 1000) {
        //         isAuthenticated = true;
        //     } else {
        //         isAuthenticated = false;
        //         localStorage.clear();
        //     };
        // };
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to="./login" />
        );
    };
};

export default ProtectedRoute;