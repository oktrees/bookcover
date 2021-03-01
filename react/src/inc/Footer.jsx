import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

const Footer = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);

  const history = useHistory();

  const onClickEvent = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      removeCookie('auth');
      alert('로그아웃이 되었습니다.');
      history.push("/");
    }
  }
  return (
    <Container>
      © COPYRIGHT 2021.
      {cookies.auth ?
        <div onClick={onClickEvent}>oktree.</div> :
        <LinkStyeld to="/admin">oktree.</LinkStyeld>
      }
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 50px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: footer;
  font-size: 14px;
`

const LinkStyeld = styled(Link)`
  cursor: text;
`

export default Footer;