import React from 'react';
import './App.css';
import CustomModal from './components/Modal';
import Intro from './components/Intro';
import NavBar from './components/NavBar';
import Post from './components/Post';
import PostDetailed from './components/PostDetailed';
import PostList from './components/PostList';
import Contact from './components/Contact';
import Copyright from './components/Copyright';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { PostDataProvider } from './providers/PostDataProvider';


const router = createBrowserRouter([
    {
        path: '/',
        element: <>
            {/* <Intro /> */}
            <NavBar />
            <PostList />
        </>,
        errorElement: <>
            <NavBar />
            <h2>Error</h2>
        </>,
    },
    {
        path: '/latest',
        element: <>
            <NavBar />
            <PostList />
        </>
    },
    {
        path: '/posts/:post_id',
        element: <>
            <NavBar />
            <PostDetailed />
        </>,
    },
    {
        path: '/contact',
        element: <>
            <NavBar />
            <Contact />
        </>,
    }
]);


function App() {
    return (
        <>
            <PostDataProvider>
                <RouterProvider router={router} />
            </PostDataProvider>
            <Copyright />
        </>
    );
}

export default App;
