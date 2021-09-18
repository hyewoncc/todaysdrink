import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/common/Header/Header';
import BeerList from './components/views/BeerList/BeerList';

function App() {
  
  return (
    <Router>
      <Header />

      <div>
        <Switch>
          <Route path="/beer" component={ BeerList }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
