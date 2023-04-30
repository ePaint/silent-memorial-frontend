import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSessionDataContext, useSessionDataSetContext } from "../../providers/SessionDataProvider";
import LoginModal from "../LoginModal/LoginModal";
import './NavBar.css';

function NavBar() {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const session = useSessionDataContext();
    const sessionSet = useSessionDataSetContext();

    useState(() => {
        setUser(session.user);
    }, [session.user]);

    useEffect(() => {
        setIsAuthenticated(session.isAuthenticated);
    }, [session.isAuthenticated]);

    useEffect(() => {
        setShowLoginModal(session.showLoginModal);
    }, [session.showLoginModal]);

    const toggleAuthenticated = () => {
        sessionSet.setIsAuthenticated(!isAuthenticated);
    }

    const toggleShowLoginModal = () => {
        sessionSet.setShowLoginModal(!showLoginModal);
    }

    return (
        <>
            { showLoginModal ? <LoginModal showModal={showLoginModal} handleClose={toggleShowLoginModal} text='test' /> : null }
            <header id="header">
                <Link to="/" className="logo">Silent Memorial</Link>
            </header>
            
            <nav id="nav">
                <ul className="links">
                    <li className="active"><Link to="/latest">Latest Memorials</Link></li>
                    <li><Link to="/search">Search Memorials</Link></li>
                    <li className="login">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleShowLoginModal}
                        >
                            Log in: {String(showLoginModal)}
                        </motion.button>
                    </li>
                </ul>
                
                <ul className="icons">
                    <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
                    <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
                    <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
                    <li><a href="#" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar