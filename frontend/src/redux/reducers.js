import { combineReducers } from 'redux';
import { SET_FILES, SET_FILTER } from './actions';

const filesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_FILES:
      return action.payload;
    default:
      return state;
  }
};

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  files: filesReducer,
  filter: filterReducer,
});

export default rootReducer;
