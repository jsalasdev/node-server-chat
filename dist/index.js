"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var router_1 = __importDefault(require("./routes/router"));
var bodyParser = require("body-parser");
var cors_1 = __importDefault(require("cors"));
var server = server_1.default.instance;
//Bodyparser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.app.use('/', router_1.default);
server.start(function () {
    console.log("Server corriendo en el puerto " + server.port);
});
