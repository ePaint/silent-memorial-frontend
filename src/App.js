import React from 'react';
import PostDetailed from './components/PostDetailed/PostDetailed';
import PostCardList from './components/PostCardList/PostCardList';
import Contact from './components/Contact/Contact';
import { createBrowserRouter, RouterProvider, Router, Routes, Route } from 'react-router-dom';
import { PostDataProvider } from './providers/PostDataProvider';
import { SessionDataProvider } from './providers/SessionDataProvider';
import ResetPasswordConfirm from './components/ResetPasswordConfirm/ResetPasswordConfirm';
import Layout from './hocs/Layout';
import { Provider } from 'react-redux';
import store from './store';
import UserActivate from './components/UserActivate/UserActivate';


const router = createBrowserRouter([{
    element: <Layout />,
    errorElement: <Layout><h2>Error</h2></Layout>,
    children: [
        {
            path: '/',
            element: <>
                {/* <Intro /> */}
                <PostCardList />
            </>,
        },
        {
            path: '/latest',
            // element: <ResetPasswordConfirm />,
            element: <PostCardList />,
        },
        {
            path: '/posts/:post_id',
            element: <PostDetailed />,
        },
        {
            path: '/contact',
            element: <Contact />,
        },
        {
            path: '/password/reset/confirm/:uid/:token',
            element: <ResetPasswordConfirm />,
        },
        {
            path: '/activate/:uid/:token',
            element: <UserActivate />,
        },
    ]
}]);

// document.body.style.overflow = 'hidden';
// document.body.style.overflow = 'auto';

function App() {
    return (
        <>
            <Provider store={store}>
                <SessionDataProvider>
                    <PostDataProvider>
                        <RouterProvider router={router} />
                    </PostDataProvider>
                </SessionDataProvider>
            </Provider>
        </>
    );
}

export default App;
