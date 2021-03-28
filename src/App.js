import "./App.css";
import Navbar from "./Components/NavBar";
import Tracker from "./Tracker";
import Vaccine from "./Vaccine";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Tracker} />
          <Route path="/tracker" component={Tracker} />
          <Route path="/vaccine" component={Vaccine} />
          <Route />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
