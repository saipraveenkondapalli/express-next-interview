"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Launch a headless browser
    const browser = yield puppeteer_1.default.launch();
    // Open a new page
    const page = yield browser.newPage();
    // Navigate to the YouTube search results page
    yield page.goto("https://www.youtube.com/results?search_query=leetcode+two+sum");
    // Wait for the page to fully load
    yield page.waitForSelector("body");
    // Extract the page title
    const pageTitle = yield page.title();
    console.log("Page title:", pageTitle);
    // Extract the URL of the first search result
    const firstResultUrl = yield page.evaluate(() => {
        const firstResult = document.querySelector("#video-title");
        return firstResult ? firstResult.href : null;
    });
    console.log("URL of the first search result:", firstResultUrl);
    // Close the browser
    yield browser.close();
}))();
//# sourceMappingURL=youtube.js.map