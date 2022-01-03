import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Vaksin from "./pages/Vaksin/vaksin";
import Login from "./pages/login";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/data" exact component={Main} />
          <Route path="/vaksin" exact component={Vaksin} />
        </Switch>
      </Router>
    );
  }
}

export default App;
