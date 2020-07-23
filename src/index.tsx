import { default as React } from 'react';
import { default as ReactDOM } from 'react-dom';
import { Index } from './components';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//const worker = new Worker('./workerfile.js');
//
//worker.addEventListener('message', (event) => {
//    console.log('Message from Worker: ' + event.data);
//});
//
//worker.postMessage('Hello World');

ReactDOM.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
    document.getElementById('root'),
);
