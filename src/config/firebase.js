import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDWs9nUhfyR3e8U_9Oo-J6MYgpazSbU34k",
    authDomain: "login-d537e.firebaseapp.com",
    projectId: "login-d537e",
    storageBucket: "login-d537e.appspot.com",
    messagingSenderId: "404352254623",
    appId: "1:404352254623:web:547601d44a3939561898aa",
    measurementId: "G-J4EN67NS2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;