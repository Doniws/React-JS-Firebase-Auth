import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const UpdateProfile = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm , setPasswordConfirm] = useState("");
    const { currentUser, updatePassword, updateEmail } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== passwordConfirm) {
            return setError("Passwords do not match")
        }
        try {
            setError("");
            setMessage("");
            await currentUser(updatePassword, updateEmail);
            setMessage("Password reset email sent");
            navigate("/");
        } catch (error) {
            setError("Failed to reset password");
        }
        
        const promises = []
        setLoading(true)
        setError("")

        if (email !== currentUser.email) {
            promises.push(updateEmail(email))
        }
        if (password) {
            promises.push(updatePassword(password))
        }

        Promise.all(promises)
            .then(() => {
                navigate("/");
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })

        
    };

    return (
        <>
            <div className="p-4 box">
                <h2 className="mb-3">Firebase Auth Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="danger">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            onChange={(e) => setEmail(currentUser.email)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password confirm"
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button disable={loading} variant="primary" type="Submit">
                            Sign up
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="p-4 box mt-3 text-center">
                Already have an account? <Link to="/">Cancel</Link>
            </div>
        </>
    );
};

export default UpdateProfile;