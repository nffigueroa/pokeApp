import React from 'react';
import './App.css';

import { getPokemonList } from './services/';
import PokeList from './pages/list/list';



function App() {
  return  <React.Fragment>
            <PokeList></PokeList>
          </React.Fragment>
}

export default App;