import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/common/Header/Header';
import BeerList from './components/views/BeerList/BeerList';
import BeerDetail from './components/views/BeerDetail/BeerDetail';
import BeerTypes from './components/views/BeerTypes/BeerTypes';
import BeerMatch from './components/views/BeerMatch/BeerMatch';
import Footer from './components/common/Footer/Footer';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';

function App() {
  
  return (
    <Router>
      <ScrollToTop />
      <Header />

      <div>
        <Switch>
          <Route exact path="/beers" component={ BeerList }/>
          <Route exact path="/beers/:beerName" component={ BeerDetail }/>
          <Route exact path="/types" component={ BeerTypes } />
          <Route exact path="/match" component={ BeerMatch }/>
        </Switch>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
