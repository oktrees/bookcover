import React from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

const apiurl = 'https://api.cndbook.com/';

const Admin = () => {
    const [cookies, setCookie] = useCookies(['auth']);

    const history = useHistory();

    const onSubmitForm = (e) => {
        e.preventDefault();
        const data = new URLSearchParams(new FormData(e.target));

        axios
        .post(apiurl + 'auth', data)
        .then(({ data }) => {
           if(data.code === 200){
                console.log(data);
                setCookie('auth', data.token, { path: '/' });
                alert('로그인이 되었습니다.');
                history.push("/");
           } else{
               console.log(data);
                alert(data.message)
           }
        })
        .catch( error => {  
            console.error(error);             
        });
    }
    return (
        <Container>
            <Form action="" onSubmit={onSubmitForm}>
                <Input type="text" name="name" placeholder="아이디"/>
                <Input type="password" name="password" placeholder="패스워드"/>
                <button>로그인</button>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    background-color: #F5F3E9;
    height: auto;
    min-height: calc(100vh - 170px);
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 1fr auto 1fr; 
`

const Form = styled.form`
    grid-area: 2/2/3/3; 
    width: auto;
    height: 90%;
    margin-top: 35%;
    margin-bottom: 5%;
`
const Input = styled.input`
    display: block;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid #aaa;
`

export default Admin;