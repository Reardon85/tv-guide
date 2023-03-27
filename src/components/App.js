import { Route, Switch } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Home from "./Home";
import SearchResults from "./SearchResults";
import ShowInfo from "./ShowInfo";


function App() {
  return (
    <div className="App">

      <Header />
      <Switch >
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
        <Route path="/show">
          <ShowInfo />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
