import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore} from 'redux';

import { Provider } from 'react-redux';
import './App.css';

import PokeList from './pages/list/list';
import FightPage from './pages/fight/fight';
import LoginPage from './pages/login/login';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';

import  allReducers  from './reducers/';

const store = createStore(allReducers, {})

function App() {
  return  <React.Fragment>
    <Provider store = {store} >
      <ErrorBoundary>
        <BrowserRouter>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/list" component={PokeList} />
          <Route exact path="/fight" component={FightPage} />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </React.Fragment>

}

export default App;