import { faDice, faWallet, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { route } from "preact-router";
import { toast } from "react-toastify";

function MobileNav(props) {
	return (
		<div class="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-gray-800 border-gray-700">
			<div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
				<button
                onClick={() => route("/games")}
					type="button"
					class="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-r  hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
				>
					<FontAwesomeIcon icon={faDice} className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" />
					<span class="text-sm text-gray-400 group-hover:text-emerald-400">
						Games
					</span>
				</button>
				<button
                    onClick={props.user ? () => route("/wallet") : () => toast("Please sign in")}
					type="button"
					class={`inline-flex flex-col items-center justify-center px-5 border-r border-gray-600 ${props.user ? "text-gray-400 hover:text-emerald-400" : "text-gray-600"} `}
				>
					<FontAwesomeIcon icon={faWallet} className="w-4 h-4 mb-1" />
					<span class="text-sm">
						Wallet
					</span>
				</button>
				<button
                    //Toggle mobile chat component on click TODO
                    onClick={props.user ? () => toast("Mobile chat component would show here") : () => toast("Please sign in")}
					type="button"
					class={`inline-flex flex-col items-center justify-center px-5 ${props.user ? "text-gray-400 hover:text-emerald-400" : "text-gray-600"} `}
				>
					<FontAwesomeIcon icon={faMessage} className="w-4 h-4 mb-1" />
					<span class="text-sm">
						Chat
					</span>
				</button>
			</div>
		</div>
	);
}

export default MobileNav;
