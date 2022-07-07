import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <div className="p-4 box mt-3 text-center">
                Hello Welcome <br />
                {user && user.displayName && <p>{user.displayName}</p>}
                {user && user.email && <p>{user.email}</p>}
                {user && user.photoURL && (
                    <img src={user.photoURL} alt="user" width="100" />
                )}
            </div>
            
                <Link to="/update-profile">
                    Update
                </Link>
         
            <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleLogout}>
                    Log out
                </Button>
            </div>
        </>
    );
};

export default Home;