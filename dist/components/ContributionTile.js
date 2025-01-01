"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContributionTile;
var react_1 = __importDefault(require("react"));
function ContributionTile(_a) {
    var contributionCount = _a.contributionCount, color = _a.color, date = _a.date;
    return (react_1.default.createElement("div", { style: {
            height: "10px",
            width: "10px",
            margin: "1px",
            borderRadius: "2px",
            backgroundColor: color,
            position: "relative",
            cursor: "pointer",
        }, title: "".concat(contributionCount, " contributions on ").concat(date), onMouseEnter: function (e) {
            var tooltip = document.createElement("div");
            tooltip.innerHTML = "".concat(contributionCount, " contributions on ").concat(date);
            tooltip.style.position = "absolute";
            tooltip.style.bottom = "20px";
            tooltip.style.left = "50%";
            tooltip.style.transform = "translateX(-50%)";
            tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            tooltip.style.color = "white";
            tooltip.style.padding = "4px 8px";
            tooltip.style.borderRadius = "4px";
            tooltip.style.fontSize = "12px";
            tooltip.style.whiteSpace = "nowrap";
            tooltip.style.zIndex = "1000";
            tooltip.className = "contribution-tooltip";
            e.currentTarget.appendChild(tooltip);
        }, onMouseLeave: function (e) {
            var tooltip = e.currentTarget.querySelector(".contribution-tooltip");
            if (tooltip) {
                tooltip.remove();
            }
        } }));
}
