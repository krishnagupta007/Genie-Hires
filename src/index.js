import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId="11288723241-humu91fpqquq0hijk0acmlrkup7isicc.apps.googleusercontent.com">
                <App />  
            </GoogleOAuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
// ReactDOM.render(
// 	<React.StrictMode>
// 		<BrowserRouter>
// 			<App />
// 		</BrowserRouter>
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );