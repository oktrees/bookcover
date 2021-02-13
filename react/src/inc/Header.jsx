import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Container>
            <LogoBox>C&D 편집디자인</LogoBox>
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
const LogoBox = styled.div`
    width: 100px;
    height: 120px;    
    display: flex;
    align-items: center;
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
    color: #888;
    font-size: 18px;
    font-weight: 400;
    &{
        transition: all .1s;
    }
    &:hover {
        color: #F0CA42;
    }
`


export default Header;