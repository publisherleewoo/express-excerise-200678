import express from "express";
import path from "path";

import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import morgan from "morgan"; // HTTP REQUEST LOGGER
import bodyParser from "body-parser"; // PARSE HTML BODY

import mongoose from "mongoose";
import session from "express-session";

import api from "./routes";

const app = express();
const port = 4000;
const devPort = 5000;

app.use("/", express.static(path.join(__dirname, "./../public")));
app.use(morgan("dev"));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
    console.log("Connected to mongodb server");
});
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect("mongodb://localhost/codelab");

/* use session */
app.use(
    session({
        secret: "CodeLab1$1$234",
        resave: false,
        saveUninitialized: true,
    })
);
//에러처리
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.use("/api", api);

/* ... 주의: API 하단부에 작성하세요 ... */
/* support client-side routing */
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../public/index.html"));
});

app.listen(port, () => {
    console.log("Express is listening on port", port);
});

if (process.env.NODE_ENV === "development") {
    console.log("Server is running on development mode");
    const config = require("../webpack.dev.config");
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log("webpack-dev-server is listening on port", devPort);
    });
}
