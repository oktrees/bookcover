import React from 'react';
import styled from 'styled-components';
import { Link, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import BookListRead from './BookListRead';
import BookListForm from './BookListForm';

const BookList = () => {
    const [cookies, setCookie] = useCookies(['auth']);

    return (
      <Container>
        <Title>
            <div>
                <span>BOOKLIST</span>
                {cookies.auth && <LinkStyled to="/booklist/form/create">글쓰기</LinkStyled> }
            </div>
        </Title>
        <Contents>
            <Route exact path="/booklist" component={BookListRead} ></Route>                  
            <Route path="/booklist/form/:name" component={BookListForm}></Route>
        </Contents>         
      </Container>
    )
}

const Container = styled.div`
    background-color: #F5F3E9;
    height: auto;
    min-height: calc(100vh - 170px);
    margin: auto;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 1fr minmax(auto,1200px) 1fr;     
`
const Title = styled.div`
    background-color: #fff;
    grid-area: 1/1/2/4;
    div {
        width: auto;
        max-width: 800px;
        margin: auto;
        font-weight: 700;
        font-size: 40px;
        color: #999;
        display: flex;
        justify-content: space-between;
    }
    @media (max-width: 1024px) {
        padding: 0 5%;
    }
`
const Contents = styled.div`
    grid-area: 2/2/3/3; 
    width: auto;
    height: 90%;
    margin-top: 5%;
    margin-bottom: 5%;
    // background-color: #fff;
    @media (min-width: 768px) and (max-width: 1024px) {
        padding: 0 5%;
    }
`
const LinkStyled = styled(Link)`
    border: 1px solid #aaa;
    font-size: 18px;
    font-weight: 400;
    color: #666;
    padding: 0px 20px ;
    height: 30px;
    line-height: 30px;
    align-self: flex-end;      
    &{
        transition: all .2s;
    }
    &:hover {
        background-color: #F0CA42;
        border: 1px solid #fff;
        color: #fff;
    }
`

export default BookList;