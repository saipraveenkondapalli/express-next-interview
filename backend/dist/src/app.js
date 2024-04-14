"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const posts_router_1 = __importDefault(require("./routes/posts.router"));
const problem_router_1 = __importDefault(require("./routes/problem.router"));
const customErrors_1 = require("../customErrors");
const app = (0, express_1.default)();
const corsWhiteList = (process.env.CORS_WHITE_LIST || "").split(",");
const corsOptions = (req, callback) => {
    // using origin to check if the request is from the white list
    var _a;
    const origin = req.headers.origin || ((_a = req.headers["x-forwarded-host"]) === null || _a === void 0 ? void 0 : _a.toString());
    if (!origin || !corsWhiteList.includes(origin)) {
        return callback(new customErrors_1.BadCorsError("Bad Cors Request"), { origin: false });
    }
    return callback(null, { origin: true });
};
// settings
app.options("*", (0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/private", posts_router_1.default);
app.use("/api/public/problems", (0, cors_1.default)(corsOptions), problem_router_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});
app.use(customErrors_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map