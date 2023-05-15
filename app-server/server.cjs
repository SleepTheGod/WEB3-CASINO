const express = require("express");
const compression = require("compression");
const path = require("path");
const { firestoreRouter } = require("./routes/firestore.cjs");

const WebSocket = require("ws");

const app = express();

app.use(compression({ threshold: 0 }));
app.use("/", express.static(path.join(__dirname, "../app-client/dist/")));
app.use("/firestore", firestoreRouter);

app.get("/*", (_req, res) => {
	res.sendFile(path.join(__dirname, "../app-client/dist", "index.html"));
});

// Real time chat Websocket server
const wss = new WebSocket.Server({ port: 8082 });
const messages = [];
wss.on("connection", (ws) => {
	console.log("Client connected to chat server!");

	ws.send(JSON.stringify(messages));

	ws.on("message", (data) => {
		let messageData = JSON.parse(data);
		if (messages.length === 50) {
			messages.shift();
			messages.push({
				username: messageData.username,
				message: messageData.message,
			});
		} else {
			messages.push({
				username: messageData.username,
				message: messageData.message,
			});
		}
		wss.clients.forEach((client) => client.send(JSON.stringify(messages))); // Send message to all Clients connected to the socket
		// ws.send(JSON.stringify(messages)); // Send data only to the message sender
	});

	ws.on("close", () => {
		console.log("client has disconected from chat server!");
	});
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
	console.log(`running on port:${PORT}`);
});
