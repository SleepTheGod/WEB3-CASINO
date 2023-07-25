const express = require("express");
const bodyParser = require("body-parser");
const { alchemy, AlchemySubscription, checkBalance, formatEth, sendTransaction } = require("../services/alchemy.cjs");
const { db, updateBalance } = require("../services/firestore.cjs");
const alchemyRouter = express.Router();
const jsonParser = bodyParser.json();

alchemyRouter.post("/check-balance", jsonParser, (req, res) => {
	checkBalance(req.body.address).then((response) => {
		res.send(response);
	});
});

alchemyRouter.post("/start-deposit-socket", jsonParser, async (req, res) => {
	// Subscribe to pending transactions for the deposit address
	alchemy.ws.once(
		{
			method: AlchemySubscription.MINED_TRANSACTIONS,
			addresses: [
				{
					to: req.body.deposit_address,
				},
			],
		},
		(tx) => {
            console.log("deposit confirmed!");
            updateBalance(req.body.userID, "increase", formatEth(tx.transaction.value));
            res.send({value: tx.transaction.value});
		}
	);
    console.log("Deposit socket started!");
});

alchemyRouter.post("/request-withdrawal", jsonParser, async (req, res) => {
    try {
        
        const firestore_data = await db
			.collection("users")
			.doc(req.body.userID)
			.get();
        console.log(req.body);
        sendTransaction(req.body.toAddress, req.body.ammount, firestore_data.data().wallet.privateKey).then((response) => {
            res.send(response);
        })
    } catch (err) {
        console.log(err);
    }
})

module.exports = { alchemyRouter }
