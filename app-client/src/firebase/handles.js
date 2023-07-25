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

const checkBalance = async (uid) => {
	let balance;
	try {
		await axios({
			method: "post",
			url: "http://localhost:3000/firestore/check-account-balance",
			data: {
				userID: uid,
			},
		}).then((res) => {
			balance = res.data.balance;
		});
	} catch (err) {
		console.log(err);
	}

	return balance;
};

const requestWithdrawal = async (uid, toAddress, ammount) => {
	try {
		await axios({
			method: "post",
			url: "http://localhost:3000/alchemy/request-withdrawal",
			data: {
				userID: uid,
				toAddress: toAddress,
				ammount: ammount,
			},
		}).then((res) => {
			toast(`Withdrawal of ${ammount} is processing!`);
		});
	} catch (err) {
		console.log(err);
	}
};

const startDepositSocket = async (uid, address) => {
	let test;
	try {
		await axios({
			method: "post",
			url: "http://localhost:3000/alchemy/start-deposit-socket",
			data: {
                userID: uid,
				deposit_address: address,
			},
		}).then((res) => {
            checkBalance(uid).then((response) => {
                test = response
                console.log(response);
            })
			toast(`deposit of ${res.data.value} ETH confirmed!`);
		});
	} catch (err) {
		console.log(err);
	}

	return test;
};

const startWithdrawalSocket = async (toAddress, address) => {
	let data;
	try {
		await axios({
			method: "post",
			url: "http://localhost:3000/alchemy/start-withdrawal-socket",
			data: {
				deposit_address: address,
				withdrawal_ddress: toAddress,
			},
		}).then((res) => {
			data = res.data;
			toast(`withdraw of ${res.data.ammount} ETH confirmed`);
		});
	} catch (err) {
		console.log(err);
	}
	return data;
};

const logOut = () => {
	signOut(auth);
};

export {
	signIn,
	signUp,
	logOut,
	postTester,
	startDepositSocket,
	checkBalance,
	getData,
	requestWithdrawal,
	startWithdrawalSocket,
};
