import React from 'react';
import styled, { keyframes, css, ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
// import Routes from './Routes'

import theme from './styles/theme'
import Header from './inc/Header';
import Footer from './inc/Footer';
import Section from './section/Section'


const test = css` 
    border: 5px solid ${props => props.theme.mainColor};
`

const Input = styled.input.attrs({
    type: "password",
    required: true
  })`
    ${test};
    
`;

const Layout = () => {
    return (            
       
        <ThemeProvider theme={theme}>
            {/* <Input placeholder="hello" /> */}
            {/* {/* <Button >hello</Button> */}
            {/* <Button danger rotationTime="15">hello</Button> */}
            {/* <Anchor href="#">go to #</Anchor>  */}
            <Container>   
                <BrowserRouter basename='/reacttest'>
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


export default Layout;