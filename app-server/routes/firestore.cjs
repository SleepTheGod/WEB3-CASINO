const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const { serviceAccount } = require("../config.cjs");
const { createWallet } = require("../alchemy/alchemy.cjs");

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
		docRef
			.set({
				id: data.userID,
				email: data.email,
				password: data.password,
				wallet: createWallet(),
			})
			.then((res) => {
				console.log(`Document written`);
			});
	} catch (err) {
		console.log(err);
	}
	res.send("Done");
});

module.exports = { firestoreRouter };
