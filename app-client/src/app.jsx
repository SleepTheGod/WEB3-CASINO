import { SideBar, Header, Footer, Chat, MobileNav } from "@components";
import { Games, Home, SignUp, SignIn, Wallet } from "@pages";
import Router from "preact-router";
import { ToastContainer } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { useEffect, useState } from "preact/hooks";
import { getData, checkBalance, startDepositSocket } from "./firebase/handles";
import { useMediaQuery } from "react-responsive";

import "react-toastify/dist/ReactToastify.css";

export function App() {
	const [user, loading, error] = useAuthState(auth);
	const [address, setAddress] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
    const [balance, setBalance] = useState(0);

    const [balanceLoading, setBalanceLoading] = useState(false);

	useEffect(() => {
        setBalanceLoading(true);
		if (user) {
			setTimeout(() => {
				getData(user.uid).then((data) => {
					console.log(data);
					setUsername(data.username);
					setEmail(data.email);
					setAddress(data.walletAddress);
                    checkBalance(user.uid).then((res) => {
                        setBalance(res);
                        setBalanceLoading(false);
                    });
                    startDepositSocket(user.uid, data.walletAddress).then((res) => {
                        setBalance(res);
                    });
				});
			}, 1000);
		}
	}, [user]);

    const isMobile = useMediaQuery({
		query: "(max-width: 1024px)",
	});

	return (
		<div className="min-h-screen bg-gray-900">
			<Header user={user} address={address} email={email} balance={balance} balanceLoading={balanceLoading}  />
			<div className="flex flex-row">
				<SideBar user={user} />
				<div className="w-full min-h-[calc(300vh-5rem)] h-auto mt-20 p-16 text-white relative flex flex-col overflow-x-hidden">
					<ToastContainer
						className="top-[-3rem] overflow-x-hidden right-[-3rem]"
						progressStyle={{ backgroundColor: "#34d399" }}
						position="top-right"
					/>
					<Router>
						<Home path="/" />
						<Games path="games" />
						<SignUp path="/sign-up" user={user} />
						<SignIn path="/sign-in" user={user} />
						<Wallet path="/wallet" user={user} address={address} balance={balance} setBalance={setBalance} />
					</Router>
					<Footer />
				</div>
				<Chat username={username} user={user} />
                {isMobile ? <MobileNav user={user} /> : <div></div> }
			</div>
		</div>
	);
}
