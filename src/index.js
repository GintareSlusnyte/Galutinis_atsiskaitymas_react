import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UsersContext from './contexts/UsersContext';
import PostsContext from './contexts/PostsContext';
import CommentsContext from './contexts/CommentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UsersContext>
            <PostsContext>
                <CommentsContext>
                    <App />
                </CommentsContext>
            </PostsContext>
        </UsersContext>
    </BrowserRouter>
);