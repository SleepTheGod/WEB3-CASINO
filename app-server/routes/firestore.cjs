const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const { serviceAccount } = require("../config.cjs");
const {
	createWallet,
	alchemy,
	checkBalance,
} = require("../alchemy/alchemy.cjs");
const { AlchemySubscription, Utils } = require("alchemy-sdk");

const firestoreRouter = express.Router();
const jsonParser = bodyParser.json();

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL:
		"https://crypto-casino-eb685-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();

firestoreRouter.post("/create-user-document", jsonParser, (req, res) => {
	let data = req.body;
	const docRef = db.doc(`users/${data.userID}`);
	try {
		docRef.set({
			id: data.userID,
			username: data.username,
			email: data.email,
			password: data.password,
			wallet: createWallet(),
		});
		res.send("Account Created");
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

firestoreRouter.post("/get-data", jsonParser, async (req, res) => {
	let data = req.body;
	try {
		const firestore_data = await db
			.collection("users")
			.doc(data.userID)
			.get();
		res.send({
			username: firestore_data.data().username,
			email: firestore_data.data().email,
			walletAddress: firestore_data.data().wallet.address,
		});
	} catch (err) {
		console.log(err);
	}
});

firestoreRouter.post("/start-balance-socket", jsonParser, async (req, res) => {
	let data = req.body;
	// Subscribe to pending transactions for the deposit address
	alchemy.ws.once(
		{
			method: AlchemySubscription.MINED_TRANSACTIONS,
			addresses: [
				{
					to: data.address,
				},
			],
		},
		(tx) => {
			checkBalance(tx.transaction.to).then((response) => {
				let deposit = {
					ammount: Utils.formatEther(tx.transaction.value),
					newBalance: response,
				};
				res.send(deposit);
			});
		}
	);

	console.log(
		`Alchemy transaction web-socket started for address: ${data.address}`
	);
});

firestoreRouter.post("/check-balance", jsonParser, (req, res) => {
	let data = req.body;
	checkBalance(data.address).then((response) => {
		res.send(response);
	});
});

// For testing
firestoreRouter.post("/test", jsonParser, (req, res) => {
	let data = req.body;
	console.log(data.animal);
	res.send(`Server received data: ${data.animal}`);
});

module.exports = { firestoreRouter };
