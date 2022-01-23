import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/_reset.css';
import './styles/index.css';
import Blog from './containers/Blog';
import store from './store';

const rootReactElement = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Blog />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

const target = document.getElementById('root');

ReactDOM.render(rootReactElement, target)
