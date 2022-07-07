import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
    // const [name , setName] = useState("");
    const [message,setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn, facebookSignIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError("");
            setMessage("");
            await logIn(email, password);
            setMessage("Welcome To Social IDN")
            navigate("/");
        } catch(error) {
            setError("Wrong Password or you never signup", (error.message));
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleFacebookSignIn = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setMessage("");
            await facebookSignIn();
            setMessage("Password reset email sent");
            navigate("/");
        } catch (error) {
            setError("Failed to reset password");
        }
    };

    return (
        <>
            <div className="p-4 box">
                <h2 className="mb-3">Firebase Auth Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Log In
                        </Button>
                    </div>
                    <div className="text-center">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Form>
                <hr />
                <div>
                    <GoogleButton
                        className="g-btn"
                        type="dark"
                        onClick={handleGoogleSignIn}
                    />
                    <GoogleButton
                        className="g-btn"
                        type="dark"
                        onClick={handleFacebookSignIn}
                    />
                </div>
            </div>
            <div className="p-4 box mt-3 text-center">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    );
};

export default Login;