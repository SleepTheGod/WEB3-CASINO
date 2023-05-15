const {
	Network,
	Alchemy,
	Wallet,
	Utils,
} = require("alchemy-sdk");
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
	};
};

const checkBalance = async (address) => {
	const balance = await alchemy.core.getBalance(address, "latest");
	return Utils.formatEther(balance);
};

module.exports = { createWallet, alchemy, checkBalance };
