import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

import { auth } from "./firebase";

import axios from 'axios';

const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.log(err);
    }
}

const signUp = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await axios({
            method: "post",
            url: "http://localhost:3000/firestore/create-user-document",
            data: {
                userID: user.uid,
                email: email,
                password: password
            }
        });
    } catch (err) {
        console.log(err);
    }
}

const logOut = () => {
    signOut(auth);
}

export { signIn, signUp, logOut }
