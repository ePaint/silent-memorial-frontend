import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Backdrop from "../Backdrop/Backdrop";
import { Link } from 'react-router-dom';
import './LoginModal.css'
import { useSessionDataContext, useSessionDataSetContext } from "../../providers/SessionDataProvider";

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.2,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        }
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

function LoginModal({ showModal, handleClose, text }) {
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className='modal'
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <p>{text} {String(showModal)}</p>
                <button onClick={handleClose}>Close</button>
            </motion.div>
        </Backdrop>
    )

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
        <div class="container-modal">
            <div class="content-modal">
                <h2>¡Bienvenido!</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur, nostrum!</p>
                <div class="btn-cerrar">
                    <label for="btn-modal">Cerrar</label>
                </div>
            </div>
            <label for="btn-modal" class="cerrar-modal"></label>
        </div>
    );
}

export default LoginModal