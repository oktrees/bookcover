import axios from "axios";
import Cookies from 'universal-cookie';

const apiurl = 'https://api.cndbook.com/';

const cookies = new Cookies();
let cookieAuth = cookies.get('auth');

const GET_BOOK = "GET_BOOK";
const CREATE_BOOK = "CREATE_BOOK";
const UPDATE_BOOK = "UPDATE_BOOK";
const DELETE_BOOK = "DELETE_BOOK";
const REQUEST_BOOK = "REQUEST_BOOK";
const SUCCESS_BOOK = "SUCCESS_BOOK";
const FAILURE_BOOK = "FAILURE_BOOK";

const getBook = () => {
  return dispatch => {
    dispatch(requestBook())
    return {
      type: GET_BOOK,
      loading: true,
      error: false,
      payload: axios.get(apiurl + 'book')
      .then(({ data }) => {
        dispatch(booksActions.successBook(data))
      })
      .catch(e => {
        dispatch(booksActions.failureBook(e))
        console.error(e);
      }),
    }
  }
} 

const createBook = payload => dispatch => {
  return {
    type: CREATE_BOOK,
    loading: true,
    error: false,
    payload: axios.post(apiurl + 'book/', payload, {
      headers: { 
        'Content-Type': 'multipart/form-data', 
        'Authorization': cookieAuth, 
      }
    })
    .then(({ data }) => {
      alert('게시글이 작성되었습니다.');
      dispatch(booksActions.getBook())
    })
    .catch(e => {
      dispatch(booksActions.failureBook(e))
      console.error(e);
    }),
  }
} 

const updateBook = (payload, param) => dispatch => {
  return {
    type: UPDATE_BOOK,
    loading: true,
    error: false,
    payload: axios.patch(apiurl + 'book/' + param, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': cookieAuth,
      }
    })
    .then(({ data }) => {
      alert('게시글이 수정되었습니다.');
      dispatch(booksActions.getBook())
    })
    .catch(e => {
      dispatch(booksActions.failureBook(e))
      console.error(e);
    }),
  }
} 

const deleteBook = payload => dispatch => {
  return {
    type: DELETE_BOOK,
    loading: true,
    error: false,
    payload: axios.delete(apiurl + 'book/' + payload, {
      headers: { 'Authorization': cookieAuth, }
    })
    .then(({ data }) => {
      alert('게시글이 삭제되었습니다.');
      dispatch(booksActions.getBook())
    })
    .catch(e => {
      dispatch(booksActions.failureBook(e))
      console.error(e);
    }),
  }
} 

const requestBook = () => {
  return {
    type: REQUEST_BOOK,
    loading: true,
    error: false,
  }
}

const successBook = payload => {
  return {
    type: SUCCESS_BOOK,
    loading: false,
    error: false,
    payload,
  }
}

const failureBook = payload => {
  return {
    type: FAILURE_BOOK,
    loading: false,
    error: true,
  }
}

const booksReducer = (state = {} , action) => {  
  switch (action.type) {
    case GET_BOOK:
    case CREATE_BOOK:
    case UPDATE_BOOK:
    case DELETE_BOOK:
    case REQUEST_BOOK:
      return { ...state, ...action}
    case SUCCESS_BOOK:
      return { ...state, ...action }    
    case FAILURE_BOOK:
      return { ...state, ...action }
    default: 
      return state;
  }
}

export const booksActions = { 
  getBook, 
  createBook,
  updateBook, 
  deleteBook,
  successBook, 
  failureBook
}

export default booksReducer;
