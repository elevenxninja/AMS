import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './store/reducers/auth';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, applyMiddleware(thunk));

const app = (<BrowserRouter>
                <App />
            </BrowserRouter>);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
serviceWorker.unregister();
