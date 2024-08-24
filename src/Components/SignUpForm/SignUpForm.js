import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/signup', { email, password });
            if (response.status === 200) {
                setShowOtpInput(true);
            }
        } catch (error) {
            setErrorMessage('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/verify-otp', { email, otp });
            if (response.status === 200) {
                // Redirect to welcome page or show success message
                alert('Signup successful!');
            }
        } catch (error) {
            setErrorMessage('Incorrect OTP. Please try again.');
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
