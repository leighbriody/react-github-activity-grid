import React from "react";

interface ContributionTileProps {
  contributionCount: number;
  color: string;
  date: string;
}

export default function ContributionTile({
  contributionCount,
  color,
  date,
}: ContributionTileProps) {
  return (
    <div
      style={{
        height: "10px",
        width: "10px",
        margin: "1px",
        borderRadius: "2px",
        backgroundColor: color,
        position: "relative",
        cursor: "pointer",
      }}
      title={`${contributionCount} contributions on ${date}`}
      onMouseEnter={(e) => {
        const tooltip = document.createElement("div");
        tooltip.innerHTML = `${contributionCount} contributions on ${date}`;
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
      }}
      onMouseLeave={(e) => {
        const tooltip = e.currentTarget.querySelector(".contribution-tooltip");
        if (tooltip) {
          tooltip.remove();
        }
      }}
    />
  );
}
