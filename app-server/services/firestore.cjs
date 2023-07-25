const admin = require("firebase-admin");
const { serviceAccount } = require("../config.cjs");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL:
		"https://crypto-casino-eb685-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();

const updateBalance = async (uid, type, ammount) => {
    const firestore_data = await db
		.collection("users")
		.doc(uid)
		.get();
	const docRef = db.doc(`users/${uid}`);
	try {
        if(type === "increase") {
            console.log(parseFloat(ammount));
            docRef.update({
                "wallet.balance": parseFloat(firestore_data.data().wallet.balance) + parseFloat(ammount),
            });
        } else {
            docRef.update({
                "wallet.balance": parseFloat(firestore_data.data().wallet.balance) - parseFloat(ammount),
            });
        }
	} catch (err) {
		console.log(err);
	}
};

module.exports = { db, updateBalance };
