import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addDisc} from '../../reducers/grid'

const Grid = props => {

  const tableRows = [];

  for (let row = props.grid[0].length - 1; row >= 0; row--) {
    const tableColumns = [];
    for (let column = 0; column < props.grid.length; column++) {
      const cell = props.grid[column][row];

      tableColumns.push(
        <td key={column + ',' + row} onClick={() => props.addDisc(column)}
          onMouseEnter={this.someHandler}
          onMouseLeave={this.someOtherHandler}
          className={'grid-disc grid-disc-player-' + getPlayerNumber(cell.usedAtTurn)}>
          <div className={'grid-disc-circle' + (props.gameOver ? ' game-over' : '')}></div>
        </td>);
    }

    tableRows.push(<tr className='grid-row' key={row}>{tableColumns}</tr>);
  }

  return (
    <table className='grid-table'>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

/**
 * Get the player number from the turn number.
 *
 * @param usedAtTurn
 * @returns {number}
 */
function getPlayerNumber(usedAtTurn) {
  return (usedAtTurn % 2) + 1;
}

const mapStateToProps = state => ({
  grid: state.grid.grid,
  gameOver: state.grid.gameOver
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addDisc
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
