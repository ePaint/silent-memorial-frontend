import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../actions/auth";
import './ResetPasswordConfirm.css';


const PasswordResetConfirm = ({ reset_password_confirm }) => {
    const [passwordInputType, setPasswordInputType] = useState("password");
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const { uid, token } = useParams();

    const { new_password, re_new_password } = formData;

    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();
        reset_password_confirm(uid, token, new_password, re_new_password);
        return navigate("/");
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
        <div class="password-reset">
            <div>Please enter your new password.</div>
            <div className="container">
                
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form__field password">
                        <i className="form__icon fas fa-lock"></i>
                        <input
                            className="form__input password"
                            type={passwordInputType}
                            placeholder="New Password"
                            name="new_password"
                            value={new_password}
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
                            placeholder="Repeat New Password"
                            name="re_new_password"
                            value={re_new_password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required />
                    </div>
                    <button className="button form__submit" type="submit">
                        <span className="button__text">Reset Password</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                </form>
            </div>
        </div>
    )
};

export default connect(null, { reset_password_confirm })(PasswordResetConfirm);