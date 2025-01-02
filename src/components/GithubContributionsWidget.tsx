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
  getColorForCount,
  getDateRange,
  getSummaryText,
} from "../utils";

interface GithubContributionsWidgetProps {
  usernames: string[];
  githubApiKey: string;
}

export default function GithubContributionsWidget({
  usernames,
  githubApiKey,
}: GithubContributionsWidgetProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hasFetched, setHasFetched] = useState(false);
  const [contributionsData, setContributionsData] = useState<
    GitHubContributionsData[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = getDateRange(selectedYear);

        let data = [] as GitHubContributionsData[];
        for (const username of usernames) {
          const response = await fetchGitHubContributions(
            username,
            githubApiKey,
            date.from,
            date.to
          );
          data.push(response);
        }

        setContributionsData(data);
        setHasFetched(true); // Moved inside the async function, after data is fetched
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        setHasFetched(true); // Still set to true even on error, but you might want different handling
      }
    };

    setHasFetched(true); // Reset loading state when year changes
    fetchData();
  }, [selectedYear]);

  if (!hasFetched) return <div>Fetching github contributions...</div>;
  if (!contributionsData) return <div>No data available</div>;

  // Merge calendar data from all users
  const mergedCalendar = contributionsData.reduce((merged, userData) => {
    const calendar =
      userData.data.repositoryOwner.contributionsCollection
        .contributionCalendar;

    if (!merged.weeks) {
      // Initialize with first user's data
      return calendar;
    }

    // Merge contribution counts for each day
    calendar.weeks.forEach((week, weekIndex) => {
      week.contributionDays.forEach((day, dayIndex) => {
        merged.weeks[weekIndex].contributionDays[dayIndex].contributionCount +=
          day.contributionCount;
        // Update color based on new contribution count
        merged.weeks[weekIndex].contributionDays[dayIndex].color =
          getColorForCount(
            merged.weeks[weekIndex].contributionDays[dayIndex].contributionCount
          );
      });
    });

    return merged;
  }, {} as (typeof contributionsData)[0]["data"]["repositoryOwner"]["contributionsCollection"]["contributionCalendar"]);

  // Get available years (full range from earliest to latest year across all users)
  const availableYears = contributionsData.reduce((years, userData) => {
    const userYears =
      userData.data.repositoryOwner.contributionsCollection.contributionYears;
    const minYear = Math.min(...userYears);
    const maxYear = Math.max(...userYears);

    if (years.length === 0) {
      // Initialize with first user's range
      return Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => minYear + i
      );
    }

    // Expand range if necessary
    const currentMin = Math.min(...years);
    const currentMax = Math.max(...years);
    const newMin = Math.min(currentMin, minYear);
    const newMax = Math.max(currentMax, maxYear);

    return Array.from({ length: newMax - newMin + 1 }, (_, i) => newMin + i);
  }, [] as number[]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "fit-content", // Add this line to contain the widget
      }}
    >
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        style={{
          padding: "0.5rem",
          borderRadius: "0.25rem",
          border: "1px solid",
          borderColor: "#d1d5db",
          backgroundColor: "transparent",
          width: "12%",
        }}
      >
        {availableYears.reverse().map((year: number) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div style={{ display: "flex", gap: "2px" }}>
        {mergedCalendar.weeks.map((week: ContributionWeek) => (
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
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: 400,
          color: "#57606a",
        }}
      >
        {getSummaryText(selectedYear, contributionsData)}
      </div>
    </div>
  );
}
