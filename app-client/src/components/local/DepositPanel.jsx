function DepositPanel(props) {
	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center px-6 py-8 mx-auto">
				<a href="#" className="flex items-center mb-6">
					<div className="font-bold text-2xl text-white">
						COIN<span className="text-emerald-400">RAF</span>
					</div>
				</a>
				<div className="w-max bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Deposit Ethereum
						</h1>
						<div className="space-y-4 md:space-y-6">
							<div>
								<label className="block mb-2 text-sm font-bold text-emerald-400">
									Your Deposit Address
								</label>
								<div className="bg-gray-900 font-bold py-2 px-4 rounded-md text-lg">
									{props.address}
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

export default DepositPanel;
