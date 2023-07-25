import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { requestWithdrawal, startWithdrawalSocket } from "../../firebase/handles";
import { useState } from "preact/hooks";

function WithdrawPanel(props) {
    const [toAddress, setToAddress] = useState("");
    const [ammount, setAmmount] = useState(0);

    const isMobile = useMediaQuery({
		query: "(max-width: 640px)",
	});

    const processWithdraw = () => {
        requestWithdrawal(props.user.uid, toAddress, ammount);
        // startWithdrawalSocket(toAddress, props.address).then((res) => {
        //     props.setBalance(res.newBalance);
        // });
    }  

	return (
		<section className="bg-gray-50 dark:bg-gray-900 animate-in slide-in-from-right duration-500">
			<div className="flex flex-col items-center px-6 py-8 mx-auto">
				<a href="#" className="flex items-center mb-6">
					<div className="font-bold text-2xl text-white">
						COIN<span className="text-emerald-400">RAF</span>
					</div>
				</a>
				<div className="w-full max-w-[40rem] bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Withdraw Ethereum
						</h1>
						<div className="space-y-4 md:space-y-6">
							<div>
								<label className="block mb-2 text-sm font-bold text-emerald-400">
									Paste your address here
								</label>
								<input
									type="text"
									placeholder="0x..."
									className="bg-gray-900 font-bold py-2 px-4 rounded-md text-lg w-full"
                                    value={toAddress}
									onChange={(e) => setToAddress(e.target.value)}
								></input>
							</div>
							<div>
								<label className="block mb-2 text-sm font-bold text-emerald-400">
									Withdrawal ammount
								</label>
								<div className="flex flex-row">
									<div className="flex bg-gray-900 w-8 justify-center rounded-l-md">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="fill-emerald-400 w-3"
											viewBox="0 0 320 512"
										>
											<path d="M311.9 260.8 160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4 8 290.6 160 512l152-221.4-152 92.8z" />
										</svg>
									</div>

									<input
										type="number"
										min="0.00"
										placeholder="0.00"
										className="bg-gray-900 font-bold py-2 pr-2 text-lg w-[8rem] max-w-full outline-none rounded-r-md"
                                        value={ammount}
									    onChange={(e) => setAmmount(e.target.value)}
									></input>

									<button onClick={processWithdraw} className="bg-emerald-400 text-gray-900 text-base font-bold rounded-md w-auto px-2 ml-4 h-[2.5rem]">
										{isMobile ? <FontAwesomeIcon icon={faPaperPlane} /> : "Request Withdrawal"}
									</button>
								</div>
							</div>

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								View Explorer
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default WithdrawPanel;
