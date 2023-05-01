import React from "react";
import Copyright from "../components/Copyright/Copyright";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import './Layout.css';

const Layout = (props) => (
    <>
        <NavBar />
        <div id="main">
            {props.children}
            <Outlet />
        </div>
        <Copyright />
    </>
);

export default Layout;