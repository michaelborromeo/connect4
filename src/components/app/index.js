import React from 'react';
import {Route} from 'react-router-dom';
import Grid from '../grid';
import GameStatus from '../gameStatus';

const App = () => (
  <div className='app'>
    <header>
      <GameStatus/>
    </header>

    <main>
      <Route exact path="/" component={Grid}/>
    </main>
  </div>
);

export default App
