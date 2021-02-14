import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
  *:focus {
    outline: 0;
    outline: none;
  }
  body {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: black;
  }
`

export default GlobalStyles;