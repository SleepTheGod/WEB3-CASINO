import { useEffect, useState } from "preact/hooks";
import ScrollableFeed from "react-scrollable-feed";
import { toast } from "react-toastify";

const ws = new WebSocket("ws://localhost:8082");

function Chat(props) {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	ws.addEventListener("open", () => {
		console.log("We are connected!");
	});

	// Need to access users name as prop and send to server when processing message (also access the firebase user as prop for sendMessage() error handling)
	// Server should return the message and the name as an object
	// Then we need to display the name and the message using the map function

	// Also need to decide on the maximum number of messages to show and how to display them
	// Change the array shift in the server

	// Maybe experiment with overflows

	// Need to style the input and button and style each message in the map function

	// Only create a websocket connection if the chat component is open. If the user closes the chat panel then close the connection
	useEffect(() => {
		ws.addEventListener("message", ({ data }) => {
			// Updates when a new message is added to message list (messages[] - server.cjs)
			setMessages(JSON.parse(data));
		});
	}, [ws]);

	const sendMessage = (message) => {
		// Send message and users name here as object
		// If !user toast error message (needs to be logged in to chat)
		if (props.user) {
			ws.send(
				JSON.stringify({
					username: props.username,
					message: message,
				})
			);
		} else {
			toast("Sign in to send message");
		}
	};

	return (
		<div className="h-[calc(100vh-5rem)] hidden lg:block sticky w-[16rem] min-w-[16rem] bg-gray-800 top-20">
			<div className="h-[calc(100%-110px)]  w-full  pt-5 pb-5">
				<ScrollableFeed
					viewableDetectionEpsilon={50}
					className="w-full !h-full flex flex-col items-center overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-80"
				>
					{messages.map((element, index) => {
						return (
							<div
								className={`bg-gray-900 rounded-md mt-4 w-[14rem]`}
								key={index}
							>
								<div className="py-2 px-3 text-gray-400 whitespace-break-spaces break-words">
									<span
										className={`font-bold ${
											props.username === element.username
												? "text-emerald-400"
												: "text-white"
										}`}
									>
										{element.username}:{" "}
									</span>
									{element.message}
								</div>
							</div>
						);
					})}
				</ScrollableFeed>
			</div>

			<div className="w-full flex justify-center h-[110px]">
				<div className="absolute bottom-4 flex flex-col w-[90%]">
					<input
						className="bg-gray-900 mb-2 text-white rounded-md h-10 pl-3 outline-none"
						placeholder="Chat..."
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					></input>
					<div className="w-full flex flex-row items-center">
						<div className="text-gray-500 font-bold">
							Rules | @ | 😀
						</div>
						<button
							onClick={() => sendMessage(message)}
							className="bg-emerald-400 font-bold rounded-md py-1 px-3 w-max ml-auto"
						>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
