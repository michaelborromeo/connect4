import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import grid from './grid';

export default combineReducers({
  router: routerReducer,
  grid
});
