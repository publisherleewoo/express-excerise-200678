var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var fs = require("fs");
//ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000");
});

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//session
app.use(
    session({
        secret: "@#@$MYSIGN#@$#$", //쿠키를 임의로 변조하는 것을 방지하기 위한 sign값
        resave: false, //세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다. express-session documentation에서는 이 값을 false 로 하는것을 권장
        saveUninitialized: true, //uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미합니다. Documentation에서 이 값을 true로 설정하는것을 권장
    })
);

var router = require("./router/main")(app, fs);
