import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './styles/GlobalStyles'
import { Provider } from "react-redux";
import store from './store/store';


ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles/>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
