import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.scss';

import Blog from './components/Blog';
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

const root = createRoot(target);

root.render(rootReactElement)
