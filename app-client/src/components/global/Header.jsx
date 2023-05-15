import { Link } from "preact-router";
import { logOut } from "../../firebase/handles";
import { Balance, MobileDropDown } from "@components";
import { useMediaQuery } from "react-responsive";

function Header(props) {
	const isMobile = useMediaQuery({
		query: "(max-width: 600px)",
	});
	return (
		<div className="w-full h-[calc(5rem-1px)] bg-gray-900 fixed border-b-2 border-gray-800 flex items-center px-6 z-30">
			<Link href="/">
				<div className="font-bold text-3xl text-white flex items-center">
					COIN<span className="text-emerald-400">RAF</span>
				</div>
			</Link>
			{props.user ? (
				<div className={isMobile ? "ml-auto" : "m-auto"}>
					<Balance user={props.user} address={props.address} />
				</div>
			) : (
				<div className="m-auto"></div>
			)}

			<div className="text-base font-bold">
				{props.user ? (
					isMobile ? (
						<MobileDropDown email={props.email} />
					) : (
						<button
							onClick={logOut}
							className="bg-gray-800 px-3 py-1 rounded-md text-white"
						>
							LOG OUT
						</button>
					)
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
