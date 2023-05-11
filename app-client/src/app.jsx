import { SideBar, Header, Footer } from "@components";
import Router from "preact-router";
import { Games, Home, SignUp, SignIn } from "@pages";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { useEffect } from "preact/hooks";

export function App() {
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if(user) {
            // get user details from firestore and pass them as props
        } else {
            // No user 
        }
    }, [user])
	return (
		<div className="min-h-screen bg-gray-900">
			<Header user={user} />
			<div className="flex flex-row">
				<SideBar />
				<div className="w-full min-h-[calc(100vh-5rem)] h-auto mt-20 p-16 text-white relative flex flex-col">
					<Router>
						<Home path="/" />
						<Games path="games" />
                        <SignUp path="/sign-up" user={user} />
                        <SignIn path="/sign-in" user={user} />
					</Router>
					<Footer />
				</div>
			</div>
		</div>
	);
}
