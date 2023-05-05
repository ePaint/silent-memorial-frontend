import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

function LoginModal({ login, handleClose, changeScreen, isAuthenticated }) {
    const [submitted, setSubmitted] = useState(false);
    const [passwordInputType, setPasswordInputType] = useState("password");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSubmitted(false);
    }

    const onSubmit = async e => {
        e.preventDefault();
        await login(email, password);
        setSubmitted(true);
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

    if (submitted && isAuthenticated) {
        handleClose();
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
                {submitted && !isAuthenticated ? <div className="general-error">
                    No active account found with the given credentials
                </div> : null}
                <button className="button form__submit" type="submit">
                    <span className="button__text">Log In Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                </button>

                <div className="modal-extra">Forgot your password? <span class="modal-redirect" onClick={() => changeScreen('password_reset')}>Reset Password!</span></div>
                <div className="modal-extra">Don't have an account? <span class="modal-redirect" onClick={() => changeScreen('signup')}>Sign Up!</span></div>		
            </form>

            
            
            <div className="social-form">
                <span className="label">Log In with</span>
                <div className="social-icons">
                    <span href="#" className="social-form__icon fab fa-google hover-scale-rotate hover-recolor"></span>
                    <span className="label">oogle</span>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginModal);