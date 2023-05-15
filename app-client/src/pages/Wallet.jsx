import { useState, useEffect } from "preact/hooks";
import { DepositPanel } from "@components";

function Wallet(props) {
	const [isDeposit, setIsDeposit] = useState(true);
	const [address, setAddress] = useState("");
	useEffect(() => {
		if (props.address) {
			setAddress(props.address);
		}
	}, [props.address]);
	return (
		<div className="w-full flex items-center flex-col">
			<div className="text-lg flex font-bold">
				<button
					onClick={() => setIsDeposit(true)}
					className={isDeposit ? `text-emerald-400` : ""}
				>
					Deposit
				</button>
				<div className="h-auto w-1 bg-gray-800 mx-6"></div>
				<button
					onClick={() => setIsDeposit(false)}
					className={!isDeposit ? `text-emerald-400` : ""}
				>
					Withdraw
				</button>
			</div>
			{isDeposit ? (
				<DepositPanel address={address} />
			) : (
				<div>Withdraw</div>
			)}
		</div>
	);
}

export default Wallet;
