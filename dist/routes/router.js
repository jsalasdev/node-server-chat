"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server_1 = __importDefault(require("../classes/server"));
var socket_1 = require("../sockets/socket");
var router = express_1.Router();
router.get('/messages', function (req, res) {
    res.json({
        ok: true,
        mensaje: 'Todo good'
    });
});
router.post('/messages', function (req, res) {
    var body = req.body.body;
    var from = req.body.from;
    var payload = {
        from: from,
        body: body
    };
    var server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        mensaje: 'Mensaje post'
    });
});
router.post('/messages/:id', function (req, res) {
    var body = req.body.body;
    var from = req.body.from;
    var id = req.params.id;
    var payload = {
        from: from,
        body: body
    };
    var server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        body: body,
        from: from,
        id: id
    });
});
router.get('/users', function (req, res) {
    var server = server_1.default.instance;
    server.io.clients(function (err, clients) {
        if (err) {
            res.json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            clients: clients
        });
    });
});
router.get('/users/detail', function (req, res) {
    res.json({
        ok: true,
        clients: socket_1.connectedUsers.getList()
    });
});
exports.default = router;
