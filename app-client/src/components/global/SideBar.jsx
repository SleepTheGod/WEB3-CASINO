import { useEffect, useState } from "preact/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
	faDice,
	faWallet,
    faChartSimple,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "preact-router";

function SideBar() {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className="flex flex-row z-10">
			<div className="h-[calc(100vh-5rem)] sticky bg-gray-800 top-20 flex justify-center border-r border-gray-700">
				{isCollapsed ? (
					<div className="h-full">
						<div className="w-20 transition-width ease pt-5 text-gray-500  justify-center items-center flex flex-col">
							<Link href="/games">
								<div className="h-max pb-6 hover:text-white">
									<FontAwesomeIcon icon={faDice} size="xl" />
								</div>
							</Link>
                            <div className="h-1 w-[50px] bg-gray-700 mb-6"></div>
							<Link>
								<div className="h-max pb-6 hover:text-white">
									<FontAwesomeIcon
										icon={faWallet}
										size="xl"
									/>
								</div>
							</Link>
                            <Link>
								<div className="h-max pb-6 hover:text-white">
									<FontAwesomeIcon
										icon={faChartSimple}
										size="xl"
									/>
								</div>
							</Link>
                            <Link>
								<div className="h-max pb-6 hover:text-white">
									<FontAwesomeIcon
										icon={faUser}
										size="xl"
									/>
								</div>
							</Link>
						</div>
					</div>
				) : (
					<div className="h-full ">
						<div className="w-[11rem]  transition-width ease pt-5 text-gray-500 pl-5 pr-5  flex flex-col animate-in slide-in-from-left">
                            <div className="w-full">
                            <Link>
							<div className="flex flex-row h-max items-center pb-6 w-full">
								<FontAwesomeIcon icon={faDice} size="lg" className="w-[25px]" />
								<div className="font-bold text-xl pl-4">
									Games
								</div>
							</div>
                            </Link>
                            <div className="h-1 bg-gray-700 w-full mb-6"></div>
                            <Link>
                                <div className="flex flex-row h-max items-center pb-6">
                                    <FontAwesomeIcon icon={faWallet} size="lg" className="w-[25px]" />
                                    <div className="font-bold text-xl pl-4">
                                        Wallet
                                    </div>
                                </div>
                            </Link>
                            <Link>
                                <div className="flex flex-row h-max items-center pb-6">
                                    <FontAwesomeIcon icon={faChartSimple} size="lg" className="w-[25px]" />
                                    <div className="font-bold text-xl pl-4">
                                        Stats
                                    </div>
                                </div>
                            </Link>
                            <Link>
                                <div className="flex flex-row h-max items-center pb-6">
                                    <FontAwesomeIcon icon={faUser} size="lg" className="w-[25px]"/>
                                    <div className="font-bold text-xl pl-4">
                                        Account
                                    </div>
                                </div>
                            </Link>
                            </div>
                            
						</div>
					</div>
				)}
			</div>
			<div
				onClick={
					isCollapsed
						? () => setIsCollapsed(false)
						: () => setIsCollapsed(true)
				}
				className={`${
					isCollapsed ? "left-20" : "left-[11rem]"
				} w-8 h-10 bg-gray-900 border-l border-b border-r border-gray-700 fixed transition-left ease flex justify-center items-center top-20 text-gray-500 rounded-br-lg cursor-pointer`}
			>
				{isCollapsed ? (
					<FontAwesomeIcon icon={faChevronRight} className="w-6" />
				) : (
					<FontAwesomeIcon icon={faChevronLeft} className="w-6" />
				)}
			</div>
		</div>
	);
}

export default SideBar;
