import React, { useState } from 'react';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setShowOtpInput(true);
            } else {
                setErrorMessage('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please check your internet connection and try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            if (response.ok) {
                // Redirect to welcome page or show success message
            } else {
                setErrorMessage('Incorrect OTP. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please check your internet connection and try again.');
        }
    };

    return (
        <div>
            {!showOtpInput ? (
                <form onSubmit={handleSignup}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                    />
                    <button type="submit">Verify OTP</button>
                </form>
            )}

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default SignupForm;
