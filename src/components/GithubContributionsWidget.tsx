"use client";

import React, { useEffect, useState } from "react";

import {
  ContributionDay,
  ContributionWeek,
  GitHubContributionsData,
} from "../types";
import ContributionTile from "./ContributionTile";
import {
  fetchGitHubContributions,
  getDateRange,
  getSummaryText,
} from "../utils";

interface GithubContributionsWidgetProps {
  username: string;
  githubApiKey: string;
}

export default function GithubContributionsWidget({
  username,
  githubApiKey,
}: GithubContributionsWidgetProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hasFetched, setHasFetched] = useState(false);
  const [contributionsData, setContributionsData] =
    useState<GitHubContributionsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = getDateRange(selectedYear);
        const data = await fetchGitHubContributions(
          username,
          githubApiKey,
          date.from,
          date.to
        );
        setContributionsData(data);
        setHasFetched(true); // Moved inside the async function, after data is fetched
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        setHasFetched(true); // Still set to true even on error, but you might want different handling
      }
    };

    setHasFetched(false); // Reset loading state when year changes
    fetchData();
  }, [selectedYear]);

  if (!hasFetched) return <div>Fetching github contributions...</div>;
  if (!contributionsData) return <div>No data available</div>;

  const calendar =
    contributionsData.data.repositoryOwner.contributionsCollection
      .contributionCalendar;

  const availableYears =
    contributionsData.data.repositoryOwner.contributionsCollection
      .contributionYears;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "2.5rem",
      }}
    >
      <div style={{ fontSize: "1.125rem", fontWeight: 500 }}>
        {getSummaryText(selectedYear, contributionsData)}
      </div>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        style={{
          padding: "0.5rem",
          borderRadius: "0.25rem",
          border: "1px solid",
          borderColor: "#d1d5db",
          backgroundColor: "transparent",
        }}
      >
        {availableYears.map((year: number) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div style={{ display: "flex", gap: "2px" }}>
        {calendar.weeks.map((week: ContributionWeek) => (
          <div
            key={week.firstDay}
            style={{ display: "flex", flexDirection: "column", gap: "2px" }}
          >
            {week.contributionDays.map((day: ContributionDay) => (
              <ContributionTile
                key={day.date}
                contributionCount={day.contributionCount}
                color={day.color}
                date={day.date}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
