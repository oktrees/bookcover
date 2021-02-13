import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Home from './Home'
import BookList from './BookList'
import Contact from './Contact'
import Admin from './Admin'

const Section = () => {  
    const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
};
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
    min-height: calc(100vh - 170px);
    margin: auto;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // background-color: #eee;
    grid-area: section;
`

export default Section;