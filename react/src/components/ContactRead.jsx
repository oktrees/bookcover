import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { contactsActions } from "../store/contacts";

const ContactRead = ({ contacts, getContact }) => {
  useEffect(() => {
    getContact()    
  }, [])

  const errorMessage = (contacts) =>{
    contacts?.error && alert('서버오류 입니다.')
  }

  return (
    <TextBox>
      {errorMessage(contacts)}
      {contacts?.loading ? 'loading...' : contacts.payload}
    </TextBox>
  )
}

const TextBox = styled.pre`
  font-size: 16px;
  line-height: 25px;
  color: #333;
  white-space: pre-wrap;
`

const mapStateToProps = (state, ownProps) => {
  return { contacts: state.contacts };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    getContact: () => dispatch(contactsActions.getContact()),   
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (ContactRead);