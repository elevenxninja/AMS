import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configStore';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



const app = (<BrowserRouter>
                <App />
            </BrowserRouter>);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
serviceWorker.unregister();
