import React from "react";
import { Redirect } from "react-router-dom";
import Authenticate from "../utils/Authentication";

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        let isAuthenticated = Authenticate();
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to="./login" />
        );
    };
};

export default ProtectedRoute;