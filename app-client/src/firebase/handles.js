import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import axios from "axios";
import { toast } from "react-toastify";

const signIn = async (email, password) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		const user = res.user;
		try {
			await axios({
				method: "post",
				url: "http://localhost:3000/firestore/get-data",
				data: {
					userID: user.uid,
				},
			}).then((res) => {
				toast(`Welcome back ${res.data.username}`); // This data will be the first name of the user (welcome message)
			});
		} catch (err) {
            console.log(`Axios error @ signIn(): ${err}`);
        }
	} catch (err) {
		console.log(err);
	}
};

const signUp = async (username, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await axios({
			method: "post",
			url: "http://localhost:3000/firestore/create-user-document",
			data: {
				userID: user.uid,
				username: username,
				email: email,
				password: password,
			},
		}).then((res) => {
			toast(res.data);
		});
	} catch (err) {
		console.log(err);
	}
};

const getData = async (uid) => {
	let data;
	try {
		await axios({
			method: "post",
			url: "http://localhost:3000/firestore/get-data",
			data: {
				userID: uid,
			},
		}).then((res) => {
			data = res.data;
		});
	} catch (err) {
		console.log(err);
	}

	return data;
};

// For testing
const postTester = async () => {
	try {
		await axios({
			method: "post",
			url: "http://localhost:3000/firestore/test",
			data: {
				animal: "cow",
			},
		}).then((res) => {
			toast(res.data);
		});
	} catch {}
};

const checkBalance = async (address) => {
	let balance;
	try {
		await axios({
			method: "post",
			url: "http://localhost:3000/firestore/check-balance",
			data: {
				address: address,
			},
		}).then((res) => {
			balance = res.data;
		});
	} catch (err) {
		console.log(err);
	}

	return balance;
};

const startBalanceSocket = async (address) => {
	let test;
	try {
		await axios({
			method: "post",
			url: "http://localhost:3000/firestore/start-balance-socket",
			data: {
				address: address,
			},
		}).then((res) => {
			test = res.data;
		});
	} catch (err) {
		console.log(err);
	}

	return test;
};

const logOut = () => {
	signOut(auth);
};

export {
	signIn,
	signUp,
	logOut,
	postTester,
	startBalanceSocket,
	checkBalance,
	getData,
};
