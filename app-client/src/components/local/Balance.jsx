import { useState, useEffect } from "preact/hooks";
import { startBalanceSocket, checkBalance } from "../../firebase/handles";
import { toast } from "react-toastify";

function Balance(props) {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        // console.log(props.address);
        if (props.address) {
            checkBalance(props.address).then((res) => {
                console.log(res);
                setBalance(res);
            })
            startBalanceSocket(props.address).then((data) => {
                setBalance(data.newBalance);
                toast(`deposit of ${data.ammount} confirmed!`);
            })
		}
    }, [props.address]);
	return (
		<div className="bg-gray-800 px-2 py-1 rounded-md flex">
			<svg xmlns="http://www.w3.org/2000/svg" className="fill-emerald-400 w-3" viewBox="0 0 320 512">
				<path d="M311.9 260.8 160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4 8 290.6 160 512l152-221.4-152 92.8z" />
			</svg>
            <div className="w-[2px] bg-gray-700 ml-2"></div>
			<div className="text-lg text-white font-bold pl-2">{balance}</div>
		</div>
	);
}

export default Balance;
