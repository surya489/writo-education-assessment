import React from "react";

import './Button.css';

const Button = ({ isSignUp, signInBtnVal, signUpBtnVal }) => {

    if (isSignUp) {
        return (
            <div className="signUpBtn">
                <input type="submit" value={signUpBtnVal} />
            </div>
        )
    }

    return (
        <div className="signInBtn">
            <input type="submit" value={signInBtnVal} />
        </div>
    )
}

export default Button;