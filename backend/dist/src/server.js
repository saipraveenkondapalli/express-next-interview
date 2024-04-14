"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const DbURI = process.env.MONGODB_URI || "";
const PORT = process.env.PORT || 4000;
console.log("DbURI", DbURI);
mongoose_1.default
    .connect(DbURI)
    .then(() => {
    console.log("Database connected successfully");
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=server.js.map