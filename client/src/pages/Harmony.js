import React from "react";
import Homefield from "../game/rooms/Homefield"
import Level1 from "../game/rooms/Level1"
import Level2 from "../game/rooms/Level2"
import Level3 from "../game/rooms/Level3"
import Bossroom from "../game/rooms/Bossroom"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function Harmony() {
  const bodyStyle = {
    height: "80vh",
    width: "100vw",
  };
  return (
    <div className="text-center" style={bodyStyle}>
      <Router>
        <Switch>
          <Route exact path="/harmony" component={Homefield}/>
          <Route exact path="/harmony/level1" component={Level1} />
          <Route exact path="/harmony/level2" component={Level2} />
          <Route exact path="/harmony/level3" component={Level3} />
          <Route exact path="/harmony/bossroom" component={Bossroom} />
        </Switch>
      </Router>
    </div>
  );
}