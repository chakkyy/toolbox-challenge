import { combineReducers } from 'redux';
import {
  SET_FILES,
  SET_FILTER,
  SET_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MODAL_FILE_DATA,
  SET_MODAL_LOADING,
  SET_MODAL_ERROR,
  SET_FILE_LIST,
  SET_FILE_LIST_LOADING,
  SET_FILE_LIST_ERROR,
} from './actions';

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

const modalReducer = (
  state = {
    isOpen: false,
    fileName: null,
    fileData: null,
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        fileName: action.payload,
        fileData: null,
        error: null,
      };
    case CLOSE_MODAL:
      return {
        isOpen: false,
        fileName: null,
        fileData: null,
        loading: false,
        error: null,
      };
    case SET_MODAL_FILE_DATA:
      return {
        ...state,
        fileData: action.payload,
      };
    case SET_MODAL_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_MODAL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const fileListReducer = (
  state = {
    files: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case SET_FILE_LIST:
      return {
        ...state,
        files: action.payload,
      };
    case SET_FILE_LIST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_FILE_LIST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  files: filesReducer,
  filter: filterReducer,
  loading: loadingReducer,
  error: errorReducer,
  modal: modalReducer,
  fileList: fileListReducer,
});

export default rootReducer;
