import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/common/Header/Header';
import BeerList from './components/views/BeerList/BeerList';
import BeerDetail from './components/views/BeerDetail/BeerDetail';

function App() {
  
  return (
    <Router>
      <Header />

      <div>
        <Switch>
          <Route exact path="/beers" component={ BeerList }/>
          <Route exact path="/beers/:beerId" component={ BeerDetail }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
