import React, { useState  } from "react";
import { Link} from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message , setMessage] = useState("");
    const [error, setError] = useState("");
    const { resetPassword } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError("");
            setMessage("");
            await resetPassword(email);
            setMessage("Password reset email sent");
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


                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Reset Password
                        </Button>
                    </div>
                    <div className="text-center">
                        <Link to="/signup">SignUp</Link>
                    </div>
                </Form>
                <hr />
                
            </div>
            <div className="p-4 box mt-3 text-center">
                Don't have an account? <Link to="/">Login</Link>
            </div>
        </>
    );
};

export default ForgotPassword;