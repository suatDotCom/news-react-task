import React from "react";

import "./assets/css/bootstrap.min.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/ticker-style.css";
import "./assets/css/main.css";
import "./assets/css/style.css";

import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home/Home";
import Store from "./store/store";
import Details from "./pages/Details/Details";
import NewsList from "./pages/Newspapper/NewsList";
import Search from "./pages/Newspapper/Search";

function App() {
  return (
    <React.StrictMode>
      <Store>
        <Router>
          <Header />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/detail">
              <Details />
            </Route>

            <Route exact path="/news/:newspaper">
              <NewsList />
            </Route>

            <Route exact path="/search/:query">
              <Search />
            </Route>

            <Route exact path="**">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </Store>
    </React.StrictMode>
  );
}

export default App;
