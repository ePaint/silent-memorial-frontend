import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Backdrop from "../Backdrop/Backdrop";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../actions/auth";

function PasswordResetModal({ reset_password, handleClose, changeScreen }) {
    const [resetRequested, setResetRequested] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        setResetRequested(true);
        reset_password(email);
    }

    const getExtra = () => {
        if (resetRequested) {
            return (
                <div className="modal-extra">An email has been sent to your email address to continue the password reset process. Please check your inbox for further instructions.</div>
            );
        } else {
            return (
                <div className="modal-extra">Already have an account? <span class="modal-redirect" onClick={() => changeScreen('login')}>Log In!</span></div>
            );
        }
    }

    return (
        <>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form__field">
                    <i className="form__icon fas fa-user"></i>
                    <input
                        className="form__input"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        disabled={resetRequested} />
                </div>
                <button className="button form__submit" type="submit" disabled={resetRequested}>
                    <span className="button__text">Reset Password</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                </button>

                {getExtra()}
            </form>
        </>
    )
}

export default connect(null, { reset_password })(PasswordResetModal);