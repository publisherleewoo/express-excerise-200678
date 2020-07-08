const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 8080;

// [ CONFIGURE mongoose ]
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect("mongodb://localhost/mongodb_tutorial", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var Book = require("./models/book");

// [CONFIGURE ROUTER]
const router = require("./routes")(app, Book);

// [RUN SERVER]
const server = app.listen(port, function () {
    console.log("Express server has started on port " + port);
});
