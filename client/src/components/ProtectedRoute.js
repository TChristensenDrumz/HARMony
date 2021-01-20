import React from "react";
import { Redirect } from "react-router-dom";
import Token from "../utils/Token";

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        let isAuthenticated = Token.authenticate();
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to="/login" />
        );
    };
};

export default ProtectedRoute;