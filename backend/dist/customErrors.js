"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.BadCorsError = void 0;
const express_jwt_1 = require("express-jwt");
class BadCorsError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadCorsError";
    }
}
exports.BadCorsError = BadCorsError;
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof BadCorsError) {
        return res.status(403).json({ message: err.message });
    }
    else if (err instanceof express_jwt_1.UnauthorizedError) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=customErrors.js.map