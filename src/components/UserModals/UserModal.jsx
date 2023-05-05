import React, { useState } from "react";
import { motion } from 'framer-motion';
import Backdrop from "../Backdrop/Backdrop";
import { connect } from "react-redux";
import { login, reset_password } from "../../actions/auth";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import PasswordResetModal from "./PasswordResetModal";
import './UserModals.css'

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.5,
            type: 'spring',
            damping: 50,
            stiffness: 500,
        }
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

function UserModal({ handleClose, screen }) {
    const [modalScreen, setModalScreen] = useState(screen ? screen : "login");

    const getModal = () => {
        switch (modalScreen) {
            case "login":
                return (
                    <LoginModal handleClose={handleClose} changeScreen={setModalScreen} />
                );
            case "signup":
                return (
                    <SignUpModal handleClose={handleClose} changeScreen={setModalScreen} />
                );
            case "password_reset":
                return (
                    <PasswordResetModal handleClose={handleClose} changeScreen={setModalScreen} />
                );
        }
    }

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
                <button className="close top-left hover-scale" onClick={handleClose}>&#10006;</button>
                <div className="container">
                    <div className="screen">
                        <div className="screen__content">
                            {getModal()}
                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>		
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    )
}

export default connect(null, { login, reset_password })(UserModal);