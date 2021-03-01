import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Container>
      <LogoBox to="/">
        <span>C</span>
        <span>&</span>
        <span>D</span>&nbsp;&nbsp;
                <span>편집디자인</span>
      </LogoBox>
      <NavBox>
        <LinkStyled to="/">HOME</LinkStyled>&nbsp;
                <LinkStyled to="/booklist">BOOKLIST</LinkStyled>&nbsp;
                <LinkStyled to="/contact">CONTACT</LinkStyled>&nbsp;
            </NavBox>
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    height: 120px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    grid-area: header;
    @media (max-width: 1024px) {
        width: 90%;
    }
`
const LogoBox = styled(Link)`
  width: 35%;
  height: 120px;    
  display: flex;
  align-items: center;
  font-size: 26px;
  font-family: 'Newsreader', serif;
  span {
    font-size: 55px;
  }
  span:nth-child(1) {
    color: #ff986c;
  }
  span:nth-child(2) {
    color: #888;
  }
  span:nth-child(3) {
    color: #ff986c;
  }
  span:nth-child(4) {
    color: #666;
    font-size: 26px;
    font-weight: 600;
    margin-top: 10px;
    @media (min-width: 768px) and (max-width: 1024px) {
      font-size:20px;
    }
    @media all and (max-width: 767px) {
      display: none;
    }
  }
`
const NavBox = styled.div`
  width:60%;
  height: 120px;    
  display: flex;
  align-items: center;
  justify-content: flex-end;    
`
const LinkStyled = styled(Link)`
  margin-left: 5%;
  color: #666;
  font-size: 18px;
  font-weight: 500;
  &{
    transition: all .1s;
  }
  &:hover {
    color: #F0CA42;
  }
`


export default Header;