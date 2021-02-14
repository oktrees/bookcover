import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

const apiurl = 'https://api.cndbook.com/';

const BookListForm = (props) => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const [cookies, setCookie] = useCookies(['auth']);

    const param = props.match.params.name;
    const history = useHistory();

    useEffect(() => {
        if(param === 'create') return;

        axios.get(apiurl + 'book/' + param)
        .then(({ data }) => {    
            console.log(data);
            setTitle(data[0].title)
            setContents(data[0].contents)
        })
        .catch(e => {              
            console.error(e);  
        });
    }, [])

    const onSubmitForm = (e) => {
        e.preventDefault();
        const data = new FormData(e.target) 
        if(param === 'create') {
            axios
                .post(apiurl + 'book/', data, { 
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': cookies.auth,
                    }
                })
                .then(({ data }) => {
                    if (data) {
                        alert('게시글이 생성되었습니다.')
                        history.push("/booklist");
                    }           
                })
                .catch(e => {  
                    alert('오류가 발생하였습니다.')
                    console.error(e);  
                });
        }else {
            axios
                .patch(apiurl + 'book/' + param, data, { 
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': cookies.auth,
                    }
                })
                .then(({ data }) => {
                    if (data) {
                        alert('게시글이 수정되었습니다.')
                        history.push("/booklist");
                    }      
                })
                .catch(e => {  
                    alert('오류가 발생하였습니다.')
                    console.error(e);  
                });
        }
    }

    return (
        <Form onSubmit={onSubmitForm} enctype="multipart/form-data">
            <Input 
                type="text" 
                name="title" 
                placeholder="제목" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea 
                name="contents" 
                value={contents} 
                placeholder="내용"
                onChange={e => setContents(e.target.value)}
            />          
            <input type="file" name="file1" />
            <input type="file" name="file2" />
            <button type="submit">확인</button>
        </Form>
    )
}
const Container = styled.div`
`

const Form = styled.form`
    width: 100%;
    height: 50vh;
    max-width: 800px;
    margin: auto;
    // border-top: 1px dashed #999;
    // border-bottom: 1px dashed #999;
    textarea {
        width: 100%;
        height: auto;
        min-height: 80%;
        border-radius: 5px;
        margin-bottom: 20px;
        border: 1px solid #aaa;
        resize: none;
    }
    @media (max-width: 1024px) {
        padding: 0 5%;
    }
`
const Input = styled.input`
    height: 40px;
    border-radius: 5px;
    margin-bottom: 10px;
    border: 1px solid #aaa;
`

export default BookListForm;