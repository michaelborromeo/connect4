import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {resetGame} from '../../reducers/grid';

const GameStatus = props => (
  <div>
    <div className='game-status'>
      {
        props.gameOver ?
          <h1>Player {props.playerTurn} has won!</h1> :
          <h1>Player {props.playerTurn}'s Turn</h1>
      }
    </div>
    <button className='reset-button' onClick={props.resetGame}>Reset Game</button>
  </div>
);

const mapStateToProps = state => ({
  playerTurn: (state.grid.turn % 2) + 1,
  gameOver: state.grid.gameOver
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetGame
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameStatus);
