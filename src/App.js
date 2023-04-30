import React from 'react';
import Intro from './components/Intro/Intro';
import NavBar from './components/NavBar/NavBar';
import PostDetailed from './components/PostDetailed/PostDetailed';
import PostCardList from './components/PostCardList/PostCardList';
import Contact from './components/Contact/Contact';
import Copyright from './components/Copyright/Copyright';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PostDataProvider } from './providers/PostDataProvider';
import { SessionDataProvider } from './providers/SessionDataProvider';


const router = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Intro />
            <NavBar />
            {/* <PostList /> */}
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
            <PostCardList />
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
            <SessionDataProvider>
                <PostDataProvider>
                    <RouterProvider router={router} />
                </PostDataProvider>
            </SessionDataProvider>
            <Copyright />
        </>
    );
}

export default App;
