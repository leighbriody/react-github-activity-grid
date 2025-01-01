"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GithubContributionsWidget;
var react_1 = __importStar(require("react"));
var ContributionTile_1 = __importDefault(require("./ContributionTile"));
var utils_1 = require("../utils");
function GithubContributionsWidget(_a) {
    var _this = this;
    var username = _a.username, githubApiKey = _a.githubApiKey;
    var _b = (0, react_1.useState)(new Date().getFullYear()), selectedYear = _b[0], setSelectedYear = _b[1];
    var _c = (0, react_1.useState)(false), hasFetched = _c[0], setHasFetched = _c[1];
    var _d = (0, react_1.useState)(null), contributionsData = _d[0], setContributionsData = _d[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var date, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        date = (0, utils_1.getDateRange)(selectedYear);
                        return [4 /*yield*/, (0, utils_1.fetchGitHubContributions)(username, githubApiKey, date.from, date.to)];
                    case 1:
                        data = _a.sent();
                        setContributionsData(data);
                        setHasFetched(true); // Moved inside the async function, after data is fetched
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching GitHub contributions:", error_1);
                        setHasFetched(true); // Still set to true even on error, but you might want different handling
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        setHasFetched(false); // Reset loading state when year changes
        fetchData();
    }, [selectedYear]);
    if (!hasFetched)
        return react_1.default.createElement("div", null, "Fetching github contributions...");
    if (!contributionsData)
        return react_1.default.createElement("div", null, "No data available");
    var calendar = contributionsData.data.repositoryOwner.contributionsCollection
        .contributionCalendar;
    var availableYears = contributionsData.data.repositoryOwner.contributionsCollection
        .contributionYears;
    return (react_1.default.createElement("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2.5rem",
        } },
        react_1.default.createElement("div", { style: { fontSize: "1.125rem", fontWeight: 500 } }, (0, utils_1.getSummaryText)(selectedYear, contributionsData)),
        react_1.default.createElement("select", { value: selectedYear, onChange: function (e) { return setSelectedYear(Number(e.target.value)); }, style: {
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: "1px solid",
                borderColor: "#d1d5db",
                backgroundColor: "transparent",
            } }, availableYears.map(function (year) { return (react_1.default.createElement("option", { key: year, value: year }, year)); })),
        react_1.default.createElement("div", { style: { display: "flex", gap: "2px" } }, calendar.weeks.map(function (week) { return (react_1.default.createElement("div", { key: week.firstDay, style: { display: "flex", flexDirection: "column", gap: "2px" } }, week.contributionDays.map(function (day) { return (react_1.default.createElement(ContributionTile_1.default, { key: day.date, contributionCount: day.contributionCount, color: day.color, date: day.date })); }))); }))));
}
