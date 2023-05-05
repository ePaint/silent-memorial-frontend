import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../actions/auth";
import './UserActivate.css';
import { useEffect } from "react";


const UserActivate = ({ verify }) => {
    const [verified, setVerified] = useState(false);
    const { uid, token } = useParams();

    const verify_account = () => {
        if (uid && token) {
            verify(uid, token);
            setVerified(true);
        }
    }

    const getMessage = () => {
        if (verified) {
            return (
                <div>Your account was succesfully activated! Please Log In</div>
            );
        } else {
            <div>Your account could not be activated.</div>
        }
    }

    useEffect(verify_account, []);

    return (
        <>
            {getMessage()}
        </>
    );
};

export default connect(null, { verify })(UserActivate);