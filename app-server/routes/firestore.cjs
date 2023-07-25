const express = require("express");
const bodyParser = require("body-parser");
const { createWallet } = require("../services/alchemy.cjs");
const { db } = require("../services/firestore.cjs");

const firestoreRouter = express.Router();
const jsonParser = bodyParser.json();

firestoreRouter.post("/check-account-balance", jsonParser, async (req, res) => {
	const firestore_data = await db
		.collection("users")
		.doc(req.body.userID)
		.get();
    res.send({balance: firestore_data.data().wallet.balance});
});

firestoreRouter.post("/create-user-document", jsonParser, (req, res) => {
	const docRef = db.doc(`users/${req.body.userID}`);
	try {
		docRef.set({
			id: req.body.userID,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			wallet: createWallet(),
		});
		res.send("Account Created");
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

firestoreRouter.post("/get-data", jsonParser, async (req, res) => {
	try {
		const firestore_data = await db
			.collection("users")
			.doc(req.body.userID)
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

module.exports = { firestoreRouter };
