import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import TablePage from './table';
import Root from './root';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Root />
        </CookiesProvider>
    </React.StrictMode>
);
