import { default as React } from 'react';
import { default as ReactDOM } from 'react-dom';
import { Index } from './components';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
    document.getElementById('root'),
);
