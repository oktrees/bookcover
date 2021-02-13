import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";

const apiurl = 'https://book.oktreeapi.com/';

const ContactRead = () => {
    const [contact, setContact ] = useState('');
    useEffect(() => {
        axios.get(apiurl + 'auth')
        .then(({ data }) => {
            setContact(data.contact);
        })
        .catch(e => {  
            console.error(e);  
        });
    }, [])
    return (
        <TextBox>   
            {contact}
        </TextBox>
    )
}

const TextBox = styled.pre`
    font-size: 16px;
    line-height: 25px;
    color: #333;
    white-space: pre-wrap;
}
`
export default ContactRead;