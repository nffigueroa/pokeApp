import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import { Provider } from 'react-redux';
import './App.css';

import PokeList from './pages/list/list';
import FightPage from './pages/fight/fight';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';



function App() {
  return  <React.Fragment>
              <ErrorBoundary>
              <BrowserRouter>
                <Route exact path="/" component={PokeList} />
                <Route exact path="/fight" component={FightPage} />
              </BrowserRouter>
              </ErrorBoundary>
          </React.Fragment>

}

export default App;