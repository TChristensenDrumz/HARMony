import React, { Component } from 'react';
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
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import Canvas from "./Canvas"

// class App extends Component {

//   state = {
//     initialize: true,
//     game: {
//       width: "100%",
//       height: "100%",
//       type: Phaser.AUTO,
//       scene: {
//         init: function() {
//           this.cameras.main.setBackgroundColor('#24252A')
//         },
//         create: function() {
//           this.helloWorld = this.add.text(
//             this.cameras.main.centerX, 
//             this.cameras.main.centerY, 
//             "Hello World", { 
//               font: "40px Arial", 
//               fill: "#ffffff" 
//             }
//           );
//           this.helloWorld.setOrigin(0.5);
//         },
//         update: function() {
//           this.helloWorld.angle += 1;
//         }
//       }
//     }
//   }

//   render() {
//     const { initialize, game } = this.state
//     return (
//       <IonPhaser game={game} initialize={initialize} />
//     )
//   }
// }

class App extends Component {
  render() {

    return (

      <Router>

      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/create" component={CreateAccount} />
        <Route exact path="/harmony">
          <ProtectedRoute component={Harmony} />
        </Route>
        <Route component={Landing} />
      </Switch>
      <Footer />
  </Router>


    )
  }
};

export default App;