import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";
import { useCookies } from 'react-cookie';

const apiurl = 'https://api.cndbook.com/';

const ContactForm = (props) => {
    const [contact, setContact ] = useState('');

    const [cookies, setCookie] = useCookies(['auth']);

    const history = useHistory();

    useEffect(() => {
        axios.get(apiurl + 'auth')
        .then(({ data }) => {
            setContact(data.contact);
        })
        .catch(e => {  
            console.error(e);  
        });
    }, [])
    const onSubmitForm = (e) => {
        e.preventDefault();
        const data = new URLSearchParams(new FormData(e.target));
        axios.patch(apiurl + 'auth', data, {
                headers: {
                    'Authorization': cookies.auth,
                }
            })
            .then(({ data }) => {
                if (data) {
                    alert('게시글이 수정되었습니다.');
                    history.push("/contact");
                }
            })
            .catch(e => {  
                console.error(e);  
            });
    }

    return (
        <Form onSubmit={onSubmitForm}>
            <div>{props.match.params.id}</div>
            <textarea 
                name="contact" 
                value={contact} 
                onChange={ e => setContact(e.target.value) }
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

export default ContactForm;