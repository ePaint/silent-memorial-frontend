import React from 'react';
import Intro from './components/Intro/Intro';
import NavBar from './components/NavBar/NavBar';
import PostDetailed from './components/PostDetailed/PostDetailed';
import PostCardList from './components/PostCardList/PostCardList';
import Contact from './components/Contact/Contact';
import Copyright from './components/Copyright/Copyright';
import { createBrowserRouter, RouterProvider, Router, Routes, Route } from 'react-router-dom';
import { PostDataProvider } from './providers/PostDataProvider';
import { SessionDataProvider } from './providers/SessionDataProvider';
import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Layout from './hocs/Layout';
import { Provider } from 'react-redux';
import store from './store';


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
            path: '/login',
            element: <Login />,
        },
        {
            path: '/signup',
            element: <SignUp />,
        },
        {
            path: '/reset_password',
            element: <ResetPassword />,
        },
        {
            path: '/password/reset/confirm/:uid/:token',
            element: <ResetPasswordConfirm />,
        },
        {
            path: '/activate/:uid/:token',
            element: <Activate />,
        },
    ]
}]);


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
