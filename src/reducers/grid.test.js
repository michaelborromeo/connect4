import grid, {GRID_ROWS, GRID_COLUMNS, resetGame, addDisc} from './grid';

test('check if the initial state is correct', () => {
  const state = grid(undefined, {});

  expect(state.grid.length).toEqual(GRID_COLUMNS);
  expect(state.grid[0].length).toEqual(GRID_ROWS);
  expect(state.turn).toEqual(0);
  expect(state.gameOver).toBeDefined();
  expect(state.gameOver).toBeFalsy();
});

test('check if the reset state is correct', () => {
  const initialState = grid(undefined, {});
  const state = grid(initialState, resetGame());

  expect(state.grid.length).toEqual(GRID_COLUMNS);
  expect(state.grid[0].length).toEqual(GRID_ROWS);
  expect(state.turn).toEqual(0);
  expect(state.gameOver).toBeDefined();
  expect(state.gameOver).toBeFalsy();
});

test('check if the state is correct after a disc is added', () => {
  const initialState = grid(undefined, {});
  const state = grid(initialState, addDisc(3));

  expect(state.grid[3][0].usedAtTurn).toEqual(0);
  expect(state.turn).toEqual(1);
  expect(state.gameOver).toBeDefined();
  expect(state.gameOver).toBeFalsy();
});

test('check if the state is correct after a few discs are added', () => {
  const initialState = grid(undefined, {});
  const state1 = grid(initialState, addDisc(3)); // player1
  const state2 = grid(state1, addDisc(1)); // player2
  const state3 = grid(state2, addDisc(3)); // player1

  expect(state3.grid[3][0].usedAtTurn).toEqual(0);
  expect(state3.grid[1][0].usedAtTurn).toEqual(1);
  expect(state3.grid[3][1].usedAtTurn).toEqual(2);
  expect(state3.turn).toEqual(3);
  expect(state3.gameOver).toBeDefined();
  expect(state3.gameOver).toBeFalsy();
});

test('check if the state after a winning condition is correct (vertical)', () => {
  const initialState = grid(undefined, {});
  const state1 = grid(initialState, addDisc(3)); // player1
  const state2 = grid(state1, addDisc(1)); // player2
  const state3 = grid(state2, addDisc(3)); // player1
  const state4 = grid(state3, addDisc(1)); // player2
  const state5 = grid(state4, addDisc(3)); // player1
  const state6 = grid(state5, addDisc(1)); // player2
  const state7 = grid(state6, addDisc(3)); // player1

  expect(state7.grid[3][0].usedAtTurn).toEqual(0);
  expect(state7.grid[1][0].usedAtTurn).toEqual(1);
  expect(state7.grid[3][1].usedAtTurn).toEqual(2);
  expect(state7.grid[1][1].usedAtTurn).toEqual(3);
  expect(state7.grid[3][2].usedAtTurn).toEqual(4);
  expect(state7.grid[1][2].usedAtTurn).toEqual(5);
  expect(state7.grid[3][3].usedAtTurn).toEqual(6);
  expect(state7.turn).toEqual(6);
  expect(state7.gameOver).toBeTruthy();
});

test('check if the state after a winning condition is correct (horizontal)', () => {
  const initialState = grid(undefined, {});
  const state1 = grid(initialState, addDisc(2)); // player1
  const state2 = grid(state1, addDisc(1)); // player2
  const state3 = grid(state2, addDisc(3)); // player1
  const state4 = grid(state3, addDisc(1)); // player2
  const state5 = grid(state4, addDisc(4)); // player1
  const state6 = grid(state5, addDisc(1)); // player2
  const state7 = grid(state6, addDisc(5)); // player1

  expect(state7.grid[2][0].usedAtTurn).toEqual(0);
  expect(state7.grid[1][0].usedAtTurn).toEqual(1);
  expect(state7.grid[3][0].usedAtTurn).toEqual(2);
  expect(state7.grid[1][1].usedAtTurn).toEqual(3);
  expect(state7.grid[4][0].usedAtTurn).toEqual(4);
  expect(state7.grid[1][2].usedAtTurn).toEqual(5);
  expect(state7.grid[5][0].usedAtTurn).toEqual(6);
  expect(state7.turn).toEqual(6);
  expect(state7.gameOver).toBeTruthy();
});

test('check if the state after a winning condition is correct (diagonal up)', () => {
  const initialState = grid(undefined, {});
  const state1 = grid(initialState, addDisc(2)); // player1
  const state2 = grid(state1, addDisc(3)); // player2
  const state3 = grid(state2, addDisc(3)); // player1
  const state4 = grid(state3, addDisc(4)); // player2
  const state5 = grid(state4, addDisc(4)); // player1
  const state6 = grid(state5, addDisc(5)); // player2
  const state7 = grid(state6, addDisc(4)); // player1
  const state8 = grid(state7, addDisc(5)); // player2
  const state9 = grid(state8, addDisc(0)); // player1
  const state10 = grid(state9, addDisc(5)); // player2
  const state11 = grid(state10, addDisc(5)); // player1

  expect(state11.grid[2][0].usedAtTurn).toEqual(0);
  expect(state11.grid[3][0].usedAtTurn).toEqual(1);
  expect(state11.grid[3][1].usedAtTurn).toEqual(2);
  expect(state11.grid[4][0].usedAtTurn).toEqual(3);
  expect(state11.grid[4][1].usedAtTurn).toEqual(4);
  expect(state11.grid[5][0].usedAtTurn).toEqual(5);
  expect(state11.grid[4][2].usedAtTurn).toEqual(6);
  expect(state11.grid[5][1].usedAtTurn).toEqual(7);
  expect(state11.grid[0][0].usedAtTurn).toEqual(8);
  expect(state11.grid[5][2].usedAtTurn).toEqual(9);
  expect(state11.grid[5][3].usedAtTurn).toEqual(10);
  expect(state11.turn).toEqual(10);
  expect(state11.gameOver).toBeTruthy();
});

test('check if the state after a winning condition is correct (diagonal down)', () => {
  const initialState = grid(undefined, {});
  const state1 = grid(initialState, addDisc(2)); // player1
  const state2 = grid(state1, addDisc(3)); // player2
  const state3 = grid(state2, addDisc(3)); // player1
  const state4 = grid(state3, addDisc(4)); // player2
  const state5 = grid(state4, addDisc(4)); // player1
  const state6 = grid(state5, addDisc(5)); // player2
  const state7 = grid(state6, addDisc(4)); // player1
  const state8 = grid(state7, addDisc(5)); // player2
  const state9 = grid(state8, addDisc(0)); // player1
  const state10 = grid(state9, addDisc(5)); // player2
  const state11 = grid(state10, addDisc(5)); // player1

  expect(state11.grid[2][0].usedAtTurn).toEqual(0);
  expect(state11.grid[3][0].usedAtTurn).toEqual(1);
  expect(state11.grid[3][1].usedAtTurn).toEqual(2);
  expect(state11.grid[4][0].usedAtTurn).toEqual(3);
  expect(state11.grid[4][1].usedAtTurn).toEqual(4);
  expect(state11.grid[5][0].usedAtTurn).toEqual(5);
  expect(state11.grid[4][2].usedAtTurn).toEqual(6);
  expect(state11.grid[5][1].usedAtTurn).toEqual(7);
  expect(state11.grid[0][0].usedAtTurn).toEqual(8);
  expect(state11.grid[5][2].usedAtTurn).toEqual(9);
  expect(state11.grid[5][3].usedAtTurn).toEqual(10);
  expect(state11.turn).toEqual(10);
  expect(state11.gameOver).toBeTruthy();
});
