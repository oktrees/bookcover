import { createStore, applyMiddleware, combineReducers } from "redux"; 
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk'

import contactsReducer from './contacts';
import booksReducer from './books';

const INCREMENT = "INCREMENT";

const book = (state = '', action) => {
  switch (action.type) {
    default: 
      return state;
  }
}

const constant = (state = '', action) => {
  switch (action.type) {
    default: 
      return state;
  }
}


const reducer = combineReducers({
  contacts: contactsReducer,
  books: booksReducer,
})

const logger = createLogger();

const store = createStore(
  reducer, 
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
);

export default store;