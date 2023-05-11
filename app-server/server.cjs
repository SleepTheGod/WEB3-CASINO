const express = require("express");
const compression = require("compression");
const path = require("path");
const { firestoreRouter } = require("./routes/firestore.cjs");

const app = express();

app.use(compression({ threshold: 0 }));
app.use("/", express.static(path.join(__dirname, "../app-client/dist/")));
app.use("/firestore", firestoreRouter);

app.get("/*", (_req, res) => {
	res.sendFile(path.join(__dirname, "../app-client/dist", "index.html"));
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
	console.log(`running on port:${PORT}`);
});
