import { default as React } from 'react';
import { default as ReactDOM } from 'react-dom';
import { App } from './App';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
