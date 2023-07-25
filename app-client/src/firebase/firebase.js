import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAUN4hnu0kfwKWfTwEz3k5ehfaUYNyWhnE",
	authDomain: "crypto-casino-eb685.firebaseapp.com",
	databaseURL:
		"https://crypto-casino-eb685-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "crypto-casino-eb685",
	storageBucket: "crypto-casino-eb685.appspot.com",
	messagingSenderId: "1052027539795",
	appId: "1:1052027539795:web:019b168b97d5cac6ab11a6",
	measurementId: "G-ZT9MKFB2QH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };