"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.IsActive = void 0;
// user status
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["INACTIVE"] = "INACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
// user role
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["AGENT"] = "AGENT";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
