"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserList = /** @class */ (function () {
    function UserList() {
        this.list = [];
    }
    UserList.prototype.add = function (user) {
        this.list.push(user);
        console.log(this.list);
        return user;
    };
    UserList.prototype.updateName = function (id, name) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.id === id) {
                user.name = name;
                break;
            }
        }
        console.log('=== Actualizando usuario ===');
        console.log(this.list);
    };
    UserList.prototype.getList = function () {
        return this.list;
    };
    UserList.prototype.getUser = function (id) {
        return this.list.find(function (user) { return user.id === id; });
    };
    UserList.prototype.getUsersFromRoom = function (room) {
        return this.list.filter(function (user) { return user.room === room; });
    };
    UserList.prototype.deleteUser = function (id) {
        var tempUser = this.getUser(id);
        this.list = this.list.filter(function (user) { return user.id !== id; });
        return tempUser;
    };
    return UserList;
}());
exports.UserList = UserList;
