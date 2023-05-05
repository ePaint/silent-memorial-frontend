import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Backdrop from "../Backdrop/Backdrop";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";

function SignUpModal({ signup, changeScreen }) {
    const [passwordInputType, setPasswordInputType] = useState("password");
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            changeScreen('login');
        }
    }

    const togglePassword = () => {
        switch (passwordInputType) {
            case "password":
                setPasswordInputType("text");
                break;
            case "text":
                setPasswordInputType("password");
                break;
        }
    }

    return (
        <>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form__field">
                    <i className="form__icon fas fa-user"></i>
                    <input
                        className="form__input"
                        type="first_name"
                        placeholder="First Name"
                        name="first_name"
                        value={first_name}
                        onChange={e => onChange(e)}
                        required />
                </div>
                <div className="form__field">
                    <i className="form__icon fas fa-user"></i>
                    <input
                        className="form__input"
                        type="last_name"
                        placeholder="Last Name"
                        name="last_name"
                        value={last_name}
                        onChange={e => onChange(e)}
                        required />
                </div>
                <div className="form__field">
                    <i className="form__icon fas fa-user"></i>
                    <input
                        className="form__input"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required />
                </div>
                <div className="form__field password">
                    <i className="form__icon fas fa-lock"></i>
                    <input
                        className="form__input password"
                        type={passwordInputType}
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required />
                    <i onClick={togglePassword} id="eye" className={"form__eye_lock fa " + (passwordInputType === "password" ? "fa-eye" : "fa-eye-slash") } />
                </div>
                <div className="form__field password">
                    <i className="form__icon fas fa-lock"></i>
                    <input
                        className="form__input password"
                        type={passwordInputType}
                        placeholder="Repeat Password"
                        name="re_password"
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required />
                </div>
                <button className="button form__submit" type="submit">
                    <span className="button__text">Sign Up Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                </button>

                <div className="modal-extra white">Already have an account? <span class="modal-redirect" onClick={() => changeScreen('login')}>Log In!</span></div>
            </form>

            <div className="social-form">
                <span className="label">Sign Up with</span>
                <div className="social-icons">
                    <span href="#" className="social-form__icon fab fa-google hover-scale-rotate hover-recolor"></span>
                    <span className="label">oogle</span>
                </div>
            </div>
        </>
    )
}

export default connect(null, { signup })(SignUpModal);