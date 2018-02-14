export const RESET_GAME = 'RESET_GAME';
export const ADD_DISC = 'ADD_DISC';

const GRID_ROWS = 6;
const GRID_COLUMNS = 7;
const DISCS_NEEDED_FOR_WIN = 4;

const initialState = {
  grid: createGrid(),
  turn: 0,
  gameOver: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...initialState
      };

    case ADD_DISC:
      if (state.gameOver) {
        return state;
      }

      // if no cell is returned then the column is full -- in this case do nothing
      const cell = findCellFromColumn(state.grid, action.column);
      if (!cell) {
        return state;
      }

      // create a new and updated grid (deep copy)
      const grid = createUpdatedGrid(state.grid, state.turn, cell);

      // find connected discs that satisfy the winning condition
      const gameOver = isGameOver(grid, state.turn, cell);

      return {
        grid,
        turn: gameOver ? state.turn : state.turn + 1,
        gameOver
      };

    default:
      return state
  }
}

export function resetGame() {
  return {
    type: RESET_GAME
  };
}

export function addDisc(column) {
  return {
    type: ADD_DISC,
    column
  };
}

/**
 * Create a new blank grid, optionally copying over data from existing grid.
 *
 * @param oldGrid
 * @returns {Array}
 */
function createGrid(oldGrid) {
  const grid = [];

  for (let i = 0; i < GRID_COLUMNS; i++) {
    const column = [];

    for (let j = 0; j < GRID_ROWS; j++) {
      const cell = {
        // when a disc is placed in this cell, it will be marked with the turn it was used
        // the player can be derived from the turn -- all even turns will be player 1, and odd for 2
        usedAtTurn: -1,
        // only when a winning set of connected discs is found will this be set to true
        connected: false
      };

      if (oldGrid) {
        // assuming oldGrid is of same size
        cell.usedAtTurn = oldGrid[i][j].usedAtTurn;
        cell.connected = oldGrid[i][j].connected;
      }

      column.push(cell);
    }
    grid.push(column);
  }

  return grid;
}

/**
 * Find the next available cell in the column specified.
 *
 * @param grid
 * @param column
 */
function findCellFromColumn(grid, column) {
  for (let row = 0; row < GRID_ROWS; row++) {
    if (grid[column][row].usedAtTurn === -1) {
      return {
        column,
        row
      };
    }
  }

  return null;
}

/**
 * Create a new grid with a new disc in the selected column.
 *
 * @param oldGrid
 * @param turn
 * @param cell
 */
function createUpdatedGrid(oldGrid, turn, cell) {
  // create a new grid from the old grid so we're not mutating state
  const newGrid = createGrid(oldGrid);
  newGrid[cell.column][cell.row].usedAtTurn = turn;
  return newGrid;
}

/**
 * Check if any connected discs satisfy the winning condition.
 *
 * Starting with the last placed disc, search outwards until either a winning set is found
 * or there are no more paths to search.
 *
 * @param grid
 * @param cell
 * @param turn
 */
function isGameOver(grid, turn, cell) {

  // the directions you can go in a 2d grid
  const directions = [
    {column: -1, row: -1, direction: "diagonalDown"},
    {column: 0, row: -1, direction: "vertical"},
    {column: 1, row: -1, direction: "diagonalUp"},
    {column: 1, row: 0, direction: "horizontal"},
    {column: 1, row: 1, direction: "diagonalDown"},
    {column: 0, row: 1, direction: "vertical"},
    {column: -1, row: 1, direction: "diagonalUp"},
    {column: -1, row: 0, direction: "horizontal"}
  ];

  // each direction starts out with one disc (the last placed disc)
  const discCountsByDirection = {
    diagonalDown: 1,
    diagonalUp: 1,
    horizontal: 1,
    vertical: 1
  };

  // tally up the adjacent cells that have discs belonging to the player
  for (let i = 0; i < directions.length; i++) {
    if (checkDirectionForWinner(grid, cell, directions[i], discCountsByDirection)) {
      return true;
    }
  }

  return false;
}

/**
 * Check the specified direction for a disc matching the current disc.
 *
 * @param grid
 * @param cell
 * @param direction
 * @param discCountsByDirection
 * @returns {*}
 */
function checkDirectionForWinner(grid, cell, direction, discCountsByDirection) {
  // get the coordinates for the cell we're checking
  const column = cell.column + direction.column;
  const row = cell.row + direction.row;

  // make sure we're inside the grid
  if (column < 0 || column >= GRID_COLUMNS || row < 0 || row >= GRID_ROWS) {
    return false;
  }

  // cell is empty?
  const adjacentCell = grid[column][row];
  if (adjacentCell.usedAtTurn === -1) {
    return false;
  }

  // player is the same?
  if (cell.usedAtTurn % 2 === adjacentCell.usedAtTurn % 2) {
    // increment the counts for the current direction
    discCountsByDirection[direction.direction]++;

    // we have a winner yet?
    if (discCountsByDirection[direction.direction] === DISCS_NEEDED_FOR_WIN) {
      return true
    }

    // recurse into this function with the adjacent cell as the new center going in the same direction
    return checkDirectionForWinner(grid, adjacentCell, direction, discCountsByDirection);
  }

  return false;
}