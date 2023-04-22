import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function LoginModal() {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const session = useSessionDataContext();
    const sessionSet = useSessionDataSetContext();

    useState(() => {
        setUser(session.user);
    }, [session.user]);

    useEffect(() => {
        setIsAuthenticated(session.isAuthenticated);
    }, [session.isAuthenticated]);

    const toggleAuthenticated = () => {
        sessionSet.setIsAuthenticated(!isAuthenticated);
    }

    return (
        <>
            <header id="header">
                <Link to="/" className="logo">Silent Memorial</Link>
            </header>
            
            <nav id="nav">
                <ul className="links">
                    <li className="active"><Link to="/">Latest Memorials</Link></li>
                    <li><Link to="/search">Search Memorials</Link></li>
                    <li className="login"><Link onClick={toggleAuthenticated}>Log In</Link></li>
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

export default LoginModal