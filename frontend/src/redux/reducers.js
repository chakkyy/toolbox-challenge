import { combineReducers } from 'redux';
import { SET_FILES, SET_FILTER, SET_LOADING, SET_ERROR, CLEAR_ERROR } from './actions';

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

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  files: filesReducer,
  filter: filterReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default rootReducer;
