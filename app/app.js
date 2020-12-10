const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// just in case get cors error:
// const cors = require("cors");
// app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/client", express.static(clientPath));

// Make the server
var server;
var port = process.env.PORT || process.env.NODE_PORT || 3000;

// Service listeners
var services = require("./services.js");
services(app);

// App listener
server = app.listen(port, function(err) {
    if (err) {
        throw err;
    }
    console.log("Listening on port " + port);
});