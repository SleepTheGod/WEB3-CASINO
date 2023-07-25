import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logOut } from "../../firebase/handles";

function MobileDropDown(props) {
	return (
		<div class="py-6 flex flex-col justify-center sm:py-12">
			<div class="flex items-center justify-center">
				<div class=" relative inline-block text-left dropdown">
					<span class="rounded-md shadow-sm ml-2">
						<button
							class="inline-flex justify-center w-full px-2 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-gray-800 rounded-md hover:text-gray-500 focus:outline-none"
							type="button"
							aria-haspopup="true"
							aria-expanded="true"
							aria-controls="headlessui-menu-items-117"
						>
							<span>
								<FontAwesomeIcon icon={faUser} />
							</span>
							<svg
								class="w-5 h-5 ml-2 -mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
					</span>
					<div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
						<div
							class="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 divide-y divide-gray-600 rounded-md shadow-lg outline-none"
							aria-labelledby="headlessui-menu-button-1"
							id="headlessui-menu-items-117"
							role="menu"
						>
							<div class="px-4 py-3">
								<p class="text-sm leading-5 text-gray-500">
									Signed in as
								</p>
								<p class="text-sm font-medium leading-5 text-gray-500 truncate">
									{props.email}
								</p>
							</div>
							<div class="py-1">
								<a
									href="javascript:void(0)"
									tabindex="0"
									class="text-gray-500 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
									role="menuitem"
								>
									Account settings
								</a>
								<a
									href="javascript:void(0)"
									tabindex="1"
									class="text-gray-500 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
									role="menuitem"
								>
									Support
								</a>
								<span
									role="menuitem"
									tabindex="-1"
									class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-500 cursor-not-allowed opacity-50"
									aria-disabled="true"
								>
									New feature (soon)
								</span>
								<a
									href="javascript:void(0)"
									tabindex="2"
									class="text-gray-500 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
									role="menuitem"
								>
									License
								</a>
							</div>
							<div class="py-1">
								<a
									onClick={logOut}
									href="javascript:void(0)"
									tabindex="3"
									class="text-red-500 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
									role="menuitem"
								>
									Sign out
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MobileDropDown;
