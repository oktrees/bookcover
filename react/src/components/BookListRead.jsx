import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect } from "react-redux";
import { booksActions } from "../store/books";

const imgurl = 'https://api.cndbook.com/';

const BookListRead = ({ getBook, deleteBook, books }) => {
  const [cookies, setCookie] = useCookies(['auth']);

  useEffect(() => {
    getBook();
  }, [])

  const onClickForm = (e) => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return;
    const param = e.target.dataset.id;
    deleteBook(param);    
  }

  return (
    <Container>
      {books?.payload?.map(val =>
        <BookBox key={val.id}>
          <img src={val.frontimg && imgurl + "uploads/" + val.frontimg} alt="" />
          <Title>{val.title}</Title>
          <div>
            {cookies.auth &&
              <LinkStyled to={`/booklist/form/${val.id}`}>수정</LinkStyled>}
            {cookies.auth && <Button onClick={onClickForm} data-id={val.id}>삭제</Button>}
          </div>
        </BookBox>
      )}
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap : wrap;
  justify-content: flex-start;
`

const BookBox = styled.div`
  width: 31% ;
  margin-left: 2%;
  margin-bottom: 8%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  img { 
    max-width: 100%;
    height: auto;
    max-height: 40vh;
    margin-bottom: 10%;
  }
  img:hover {
    transition: all .3s;
    transform: scale(1.04);
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 44% ;
    margin: 0 3%;
  }
  @media all and (max-width: 767px) {
    width: 90% ;
    margin: 0 5%;
    margin-bottom: 15%;
  }
`
const Title = styled.div`
  color: #666;
  &:hover {
    transition: all .1s;
    color: #333;
  }
`

const button = css`
  display: inline-block;
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
    border: 1px solid #F0CA42;
    color: #fff;
  }
`

const Button = styled.div`
  ${button}
`

const LinkStyled = styled(Link)`
  ${button}
`
const mapStateToProps = (state, ownProps) => {
  return { books: state.books };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    getBook: () => dispatch(booksActions.getBook()),   
    deleteBook: (param) => dispatch(booksActions.deleteBook(param)),   
  };
}


export default connect(mapStateToProps, mapDispatchToProps) (BookListRead);