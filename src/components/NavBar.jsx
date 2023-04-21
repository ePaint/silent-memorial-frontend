import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { usePostDataContext, usePostDataLoadContext } from '../providers/PostDataProvider';

function NavBar() {
    return (
        <>
            <header id="header">
            <Link to="/" className="logo">Silent Memorial</Link>
            </header>

            <nav id="nav">
                <ul className="links">
                    <li className="active"><Link to="/">Latest Memorials</Link></li>
                    <li><a href="generic.html">Search Memorials</a></li>
                    <li className="signup"><a href="elements.html">Sign Up</a></li>
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