import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Home from '../routes/Home'
import BookList from '../routes/BookList'
import Contact from '../routes/Contact'
import Admin from '../routes/Admin'

const Section = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} ></Route>
        <Route path="/booklist" component={BookList}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route path="/admin" component={Admin}></Route>
      </Switch>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 200px);
  margin: auto;
  grid-area: section;
`

export default Section;