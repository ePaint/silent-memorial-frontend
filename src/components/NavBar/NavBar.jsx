import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import MyAccount from "../MyAccount/MyAccount.jsx";
import './NavBar.css';
import UserModal from "../UserModals/UserModal";

function NavBar({ logout, isAuthenticated }) {
    const [modalScreen, setModalScreen] = useState(null);

    const displayLoginModal = () => setModalScreen("login");

    const displaySignUpModal = () => setModalScreen("signup");

    const hideModal = () => setModalScreen(null);
    
    const authLinks = () => (
        <li className="user-panel">
            <Link to="/my-account">My Account</Link>
            <Link to="#!" onClick={logout}>Logout</Link>
        </li>
    )

    console.log(modalScreen);

    const guestLinks = () => (
        <li className="user-panel">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={displayLoginModal}
            >
                Log In
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={displaySignUpModal}
            >
                Sign Up
            </motion.button>
        </li>
    )

    return (
        <>
            
            <AnimatePresence mode='wait'>
                { modalScreen ? <UserModal handleClose={hideModal} screen={modalScreen} /> : null }
            </AnimatePresence>
            
            <header id="header">
                <Link to="/" className="logo">Silent Memorial</Link>
            </header>
            
            <nav id="nav">
                <ul className="links">
                    <li><Link to="/latest">Latest Memorials</Link></li>
                    <li><Link to="/search">Search Memorials</Link></li>
                    {isAuthenticated ? authLinks() : guestLinks()}
                </ul>
            </nav>
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavBar);