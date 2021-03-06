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
import Character from "./components/CharacterSelect/Select"
import { Home, Level1, Level2, Level3, BossRoom } from "./pages/Levels";
import GG from "./components/GameOver/GG";
import Win from './components/GameOver/Win';

const App = () => {

  let playing = true;

  return (
    <div style={{height: "100vh", width: "100vw", backgroundColor: "black"}}>
    <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/create" component={CreateAccount} />
          <Route exact path="/character">
            <ProtectedRoute component={Character} />
          </Route>
          <Route exact path="/harmony">
            <ProtectedRoute component={Home} />
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
            <ProtectedRoute component={BossRoom} />
          </Route>
          <Route exact path="/harmony/gameover">
            <ProtectedRoute component={GG} />
          </Route>
          <Route exact path="/harmony/winner">
            <ProtectedRoute component={Win} />
          </Route>
          <Route component={Landing} />
        </Switch>
        <Footer />
    </Router>
    </div>

  )
};

export default App;