import axios from "axios";
import Cookies from 'universal-cookie';

const apiurl = 'https://api.cndbook.com/';

const cookies = new Cookies();
let cookieAuth = cookies.get('auth');

const GET_CONTACT = "GET_CONTACT";
const UPDATE_CONTACT = "UPDATE_CONTACT";
const REQUEST_CONTACT = "REQUEST_CONTACT";
const SUCCESS_CONTACT = "SUCCESS_CONTACT";
const FAILURE_CONTACT = "FAILURE_CONTACT";

const getContact = payload => {
  return dispatch => {
    dispatch(requestContact())
    return {
      type: GET_CONTACT,
      loading: true,
      error: false,
      payload: axios.get(apiurl + 'auth')
      .then(({ data }) => {
        dispatch(contactsActions.successContact(data.contact))
      })
      .catch(e => {
        dispatch(contactsActions.failureContact())
        console.error(e);
      }),
    }
  }
} 

const updateContact = payload => dispatch => {
  return {
    type: UPDATE_CONTACT,
    loading: true,
    error: false,
    payload: axios.patch(apiurl + 'auth', payload, {
      headers: { 'Authorization': cookieAuth, }
    })
    .then(({ data }) => {
      alert('게시글이 수정되었습니다.');
      dispatch(contactsActions.getContact())
    })
    .catch(e => {
      dispatch(contactsActions.failureContact())
      console.error(e);
    })
  }  
} 

const requestContact = () => {
  return {
    type: REQUEST_CONTACT,
    loading: true,
    error: false,
  }
}

const successContact = payload => {
  return {
    type: SUCCESS_CONTACT,
    loading: false,
    error: false,
    payload,
  }
}

const failureContact = () => {
  return {
    type: FAILURE_CONTACT,
    loading: false,
    error: true,
  }
}

const contactsReducer = (state = {} , action) => {
  switch (action.type) {
    case GET_CONTACT:
    case UPDATE_CONTACT:
    case REQUEST_CONTACT:
      return { ...state, ...action}
    case SUCCESS_CONTACT:
      return { ...state, ...action }    
    case FAILURE_CONTACT:
      return { ...state, ...action }
    default: 
      return state;
  }
}

export const contactsActions = { 
  getContact, 
  updateContact, 
  successContact, 
  failureContact 
}

export default contactsReducer;
