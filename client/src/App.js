import React from 'react';
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "nes.css/css/nes.min.css";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"
import Harmony from "./pages/Harmony"

const App = () => {
  
  return (

    <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/create" component={CreateAccount} />
          <Route path="/harmony">
            <ProtectedRoute component={Harmony} />
          </Route>
          <Route component={Landing} />
        </Switch>
        <Footer />
    </Router>

  )
};

export default App;