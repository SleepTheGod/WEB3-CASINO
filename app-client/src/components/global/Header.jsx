import { Link } from "preact-router";
import { logOut } from "../../firebase/handles";

function Header(props) {
	return (
		<div className="w-full h-[calc(5rem-1px)] bg-gray-900 fixed border-b-2 border-gray-800 flex items-center px-6 z-20">
			<Link href="/">
				<div className="font-bold text-3xl text-white">
					COIN<span className="text-emerald-400">RAF</span>
				</div>
			</Link>
			<div className="ml-auto text-base font-bold">
				{props.user ? (
					<div onClick={logOut} className="bg-gray-800 px-3 py-1 rounded-md text-gray-500">LOG OUT</div>
				) : (
					<div>
						<Link href="/sign-in">
							<button className="text-emerald-400 pr-6">
								LOGIN
							</button>
						</Link>
						<Link href="/sign-up">
							<button className="bg-emerald-400 px-3 py-1 rounded-md">
								SIGN UP
							</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default Header;
