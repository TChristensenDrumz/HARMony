import React from "react";
import Canvas3 from "../Canvas3";
import Canvas4 from "../Canvas4";
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
          <Route exact path="/harmony" component={Canvas3}/>
          <Route exact path="/harmony/testing" component={Canvas4} />
        </Switch>
      </Router>
    </div>
  );
}