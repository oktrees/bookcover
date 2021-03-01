import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import { contactsActions } from "../store/contacts";

const ContactForm = ({ match, contacts, getContact, updateContact }) => {
  const [contact, setContact] = useState('');

  const history = useHistory();

  useEffect(() => {
    getContact();
    contacts?.payload && setContact(contacts.payload);
  }, [])
  
  const onSubmitForm = (e) => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(e.target));
    updateContact(data);
    history.push("/contact");
  }

  return (
    <Form onSubmit={onSubmitForm}>
      <div>{match.params.id}</div>
      <textarea
        name="contact"
        value={contact}
        onChange={e => setContact(e.target.value)}
      />
      <button type="submit">수정하기</button>
    </Form>
  )
}

const Form = styled.form`
  height: 100%;
  textarea {
    width: 100%;
    height: auto;
    min-height: 80%;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid #aaa;
    resize: none;
    font-size: 16px;
    line-height: 25px;
    color: #333;
  }
`

const mapStateToProps = (state, ownProps) => {
  return { contacts: state.contacts };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    getContact: () => dispatch(contactsActions.getContact()),   
    updateContact: (data) => dispatch(contactsActions.updateContact(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (ContactForm);