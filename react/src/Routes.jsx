import React, { Component } from 'react';
import Home from './Home'
import BookList from './BookList'
import Contact from './Contact'

export default class Routes extends Component {
    render() {        
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1))
        console.log(this.props.match.params);
        if(this.props.match.params.name === 'home') {
            return <Home />
        }else if(this.props.match.params.name === 'booklist') {
            return <BookList />
        }else if(this.props.match.params.name === 'contact') {
            return <Contact />
        }
        return null;
    }
}
