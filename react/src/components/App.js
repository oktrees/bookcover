import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import theme from '../styles/theme'
import Header from '../inc/Header';
import Footer from '../inc/Footer';
import Section from '../inc/Section'

const App = () => {
  return (                   
    <ThemeProvider theme={theme}>
      <Container>   
        <BrowserRouter basename='/'>
          <Header />
          <Section />
          <Footer />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  height: auto;
  min-height: 100vh;
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-rows: 120px auto 50px;
  grid-template-columns: 1fr minmax(auto,800px) 1fr;
  grid-template-areas:
  "header header header"
  "section section section"
  "footer footer footer";      
`

export default App;