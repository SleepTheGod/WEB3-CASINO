import { SideBar, Header, Footer, Chat } from "@components";
import Router from "preact-router";
import { Games, Home, SignUp, SignIn, Wallet } from "@pages";
import { ToastContainer, toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { useEffect } from "preact/hooks";
import { useState } from "preact/hooks";
import { getData } from "./firebase/handles";

import "react-toastify/dist/ReactToastify.css";

export function App() {
	const [user, loading, error] = useAuthState(auth);
	const [address, setAddress] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				getData(user.uid).then((data) => {
					console.log(data);
					setUsername(data.username);
					setEmail(data.email);
					setAddress(data.walletAddress);
				});
			}, 1000);
		}
	}, [user]);

	return (
		<div className="min-h-screen bg-gray-900">
			<Header user={user} address={address} email={email} />
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
						<Wallet path="/wallet" user={user} address={address} />
					</Router>
					<Footer />
				</div>
				<Chat username={username} user={user} />
			</div>
		</div>
	);
}
