import React, { useEffect } from "react";
import Copyright from "../components/Copyright/Copyright";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { connect } from 'react-redux';
import { check_authenticated, load_user } from "../actions/auth";
import './Layout.css';

const Layout = (props) => {
    useEffect(() => {
        props.check_authenticated();
        props.load_user();
    }, []);

    return (
        <>
            <NavBar />
            <div id="main">
                {props.children}
                <Outlet />
            </div>
            <Copyright />
        </>
    )
};

export default connect(null, { check_authenticated, load_user })(Layout);