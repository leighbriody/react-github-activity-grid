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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRange = void 0;
exports.fetchGitHubContributions = fetchGitHubContributions;
exports.getSummaryText = getSummaryText;
exports.getColorForCount = getColorForCount;
function fetchGitHubContributions(username, githubApiKey, from, to) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!githubApiKey) {
                        throw new Error("GITHUB_TOKEN is not defined in environment variables");
                    }
                    return [4 /*yield*/, fetch("https://api.github.com/graphql", {
                            method: "POST",
                            headers: {
                                Authorization: "bearer ".concat(githubApiKey),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                query: "\n        query {\n          repositoryOwner(login: \"".concat(username, "\") {\n            login\n            ... on User {\n              contributionsCollection(from: \"").concat(from, "\", to: \"").concat(to, "\") {\n              contributionYears   \n              contributionCalendar {\n                  totalContributions\n                  weeks {\n                    contributionDays {\n                      contributionCount\n                      date\n                      color\n                      weekday\n                    }\n                    firstDay\n                  }\n                  colors\n                  months {\n                    firstDay\n                    name\n                    totalWeeks\n                    year\n                  }\n                }\n              }\n            }\n          }\n        }\n      "),
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function getSummaryText(year, contributionsData) {
    // Filter and map users with their contribution counts
    var userContributions = contributionsData
        .map(function (userData) { return ({
        username: userData.data.repositoryOwner.login,
        contributions: userData.data.repositoryOwner.contributionsCollection
            .contributionCalendar.totalContributions,
    }); })
        .filter(function (user) { return user.contributions > 0; });
    var totalContributions = userContributions.reduce(function (total, user) { return total + user.contributions; }, 0);
    // Handle different cases based on contributing users
    if (userContributions.length === 0) {
        return "No contributions in ".concat(year);
    }
    var usernames = userContributions.length === 1
        ? userContributions[0].username
        : userContributions
            .map(function (user) { return "".concat(user.username, " (").concat(user.contributions, ")"); })
            .join(" and ");
    return "".concat(totalContributions, " contributions in ").concat(year, " by ").concat(usernames);
}
var getDateRange = function (year) {
    var now = new Date();
    var to = new Date();
    var from = new Date(to);
    from.setFullYear(from.getFullYear() - 1); // Go back one year from today
    // If selected year is current year, use the rolling year window
    if (year === now.getFullYear()) {
        return {
            from: from.toISOString(),
            to: to.toISOString(),
        };
    }
    // Otherwise use the specific calendar year
    return {
        from: "".concat(year, "-01-01T00:00:00"),
        to: "".concat(year, "-12-31T23:59:59"),
    };
};
exports.getDateRange = getDateRange;
function getColorForCount(count) {
    // Adjust these thresholds and colors based on your needs
    if (count === 0)
        return "#ebedf0";
    if (count <= 3)
        return "#9be9a8";
    if (count <= 6)
        return "#40c463";
    if (count <= 9)
        return "#30a14e";
    return "#216e39";
}
