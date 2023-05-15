import { postTester } from "../firebase/handles";

function Home() {
	return (
		<div className="z-10">
			<div className="text-6xl font-bold pb-4">
				BE<span className="opacity-10">AT</span> THE HOUSE
			</div>
			<div className="text-3xl font-bold">A NEW WAY TO PLAY.</div>

			{/* For testing */}
			<button
				onClick={postTester}
				className="bg-emerald-400 font-bold px-2 py-1 mt-6 text-gray-900"
			>
				Post test
			</button>
		</div>
	);
}

export default Home;
