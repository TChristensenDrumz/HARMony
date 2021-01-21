//React
import React from 'react';
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "nes.css/css/nes.min.css";

//Routes
import Header from "./components/Header"
import Footer from "./components/Footer"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"
import Homefield from "./game/rooms/Homefield"
import Level1 from "./game/rooms/Level1"
import Level2 from "./game/rooms/Level2"
import Level3 from "./game/rooms/Level3"
import Bossroom from "./game/rooms/Bossroom"
import Canvas from './Canvas3';
// import Harmony from "./pages/Harmony"

const App = () => {
  
  return (

    <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/create" component={CreateAccount} />
          <Route exact path="/harmony">
            <ProtectedRoute component={Canvas} />
          </Route>
          <Route exact path="/harmony/level1">
            <ProtectedRoute component={Level1} />
          </Route>
          <Route exact path="/harmony/level2">
            <ProtectedRoute component={Level2} />
          </Route>
          <Route exact path="/harmony/level3">
            <ProtectedRoute component={Level3} />
          </Route>
          <Route exact path="/harmony/bossroom">
            <ProtectedRoute component={Bossroom} />
          </Route>
          <Route component={Landing} />
        </Switch>
        <Footer />
    </Router>

  )
};

export default App;