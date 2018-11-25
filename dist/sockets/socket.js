"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_list_1 = require("../classes/user-list");
var user_1 = require("../classes/user");
exports.connectedUsers = new user_list_1.UserList();
exports.connectClient = function (client, io) {
    var user = new user_1.User(client.id);
    exports.connectedUsers.add(user);
};
exports.disconnect = function (client, io) {
    client.on('disconnect', function () {
        console.log('Cliente desconectado.');
        exports.connectedUsers.deleteUser(client.id);
        io.emit('usuarios-activos', exports.connectedUsers.getList());
        console.log(exports.connectedUsers.getList());
    });
};
exports.message = function (client, io) {
    client.on('mensaje', function (payload) {
        console.log('Mensaje recibido ', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.login = function (client, io) {
    client.on('configure-user', function (payload, callback) {
        exports.connectedUsers.updateName(client.id, payload.name);
        io.emit('usuarios-activos', exports.connectedUsers.getList());
        callback({
            ok: true,
            message: "Usuario " + payload.name + " configurado."
        });
    });
};
exports.getUsers = function (client, io) {
    client.on('new-user', function () {
        io.to(client.id).emit('usuarios-activos', exports.connectedUsers.getList());
    });
};
