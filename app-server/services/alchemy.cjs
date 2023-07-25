const { Network, Alchemy, Wallet, Utils } = require("alchemy-sdk");
const { db } = require("./firestore.cjs");
const { AlchemySubscription } = require("alchemy-sdk");
const { ALCHEMY_API_KEY } = process.env;

const settings = {
	apiKey: ALCHEMY_API_KEY,
	network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

const createWallet = () => {
	const generateRandomHex = (size) =>
		[...Array(size)]
			.map(() => Math.floor(Math.random() * 16).toString(16))
			.join("");

	let privateKey = generateRandomHex(64);
	let wallet = new Wallet(privateKey);

	return {
		address: wallet.address,
		privateKey: privateKey,
        balance: 0
	};
};

const checkBalance = async (address) => {
	const balance = await alchemy.core.getBalance(address, "latest");
	return Utils.formatEther(balance);
};

const sendTransaction = async (toAddress, ammount, privateKey) => {
	let wallet = new Wallet(privateKey);
	const nonce = await alchemy.core.getTransactionCount(
		wallet.address,
		"latest"
	);

	let transaction = {
		to: toAddress,
		value: Utils.parseEther(ammount),
		gasLimit: "21000",
		maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
		maxFeePerGas: Utils.parseUnits("20", "gwei"),
		nonce: nonce,
		type: 2,
		chainId: 11155111,
	};

	let rawTransaction = await wallet.signTransaction(transaction);
	let tx = await alchemy.core.sendTransaction(rawTransaction);
	return "sent transaction: " + tx;
};

const formatEth = (value) => {
    return Utils.formatEther(value);
}

module.exports = {
	createWallet,
	alchemy,
	checkBalance,
	sendTransaction,
	AlchemySubscription,
    formatEth
};
