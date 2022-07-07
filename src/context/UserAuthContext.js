import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
// import { display } from "@mui/system";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function logOut() {
        return signOut(auth);
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }
    function facebookSignIn() {
        const facebookAuthProvider = new FacebookAuthProvider();
        return signInWithPopup(auth, facebookAuthProvider);
    }
    function resetPassword(email) {
        return sendPasswordResetEmail(auth , email);
    }
    function updateEmail(email) {
        return auth.currentUser.updateEmail(email);
    }
    function updatePassword(password) {
        return auth.currentUser.updatePassword(password);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("Auth", currentuser);
            setUser(currentuser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const value = {
        user, 
        logIn, 
        signUp, 
        logOut, 
        facebookSignIn, 
        googleSignIn, 
        resetPassword,
        updateEmail,
        updatePassword,
    }
    return (
        <userAuthContext.Provider value={value} >
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}