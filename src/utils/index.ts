import { GitHubContributionsData } from "../types";

export async function fetchGitHubContributions(
  username: string,
  githubApiKey: string,
  from: string,
  to: string
) {
  if (!githubApiKey) {
    throw new Error("GITHUB_TOKEN is not defined in environment variables");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${githubApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          repositoryOwner(login: "${username}") {
            login
            ... on User {
              contributionsCollection(from: "${from}", to: "${to}") {
              contributionYears   
              contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                      color
                      weekday
                    }
                    firstDay
                  }
                  colors
                  months {
                    firstDay
                    name
                    totalWeeks
                    year
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const data = await response.json();
  return data;
}

export function getSummaryText(
  year: number,
  contributionsData: GitHubContributionsData[]
): string {
  // Filter and map users with their contribution counts
  const userContributions = contributionsData
    .map((userData) => ({
      username: userData.data.repositoryOwner.login,
      contributions:
        userData.data.repositoryOwner.contributionsCollection
          .contributionCalendar.totalContributions,
    }))
    .filter((user) => user.contributions > 0);

  const totalContributions = userContributions.reduce(
    (total, user) => total + user.contributions,
    0
  );

  // Handle different cases based on contributing users
  if (userContributions.length === 0) {
    return `No contributions in ${year}`;
  }

  const usernames =
    userContributions.length === 1
      ? userContributions[0].username
      : userContributions
          .map((user) => `${user.username} (${user.contributions})`)
          .join(" and ");

  return `${totalContributions} contributions in ${year} by ${usernames}`;
}

export const getDateRange = (year: number) => {
  const now = new Date();
  const to = new Date();
  const from = new Date(to);
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
    from: `${year}-01-01T00:00:00`,
    to: `${year}-12-31T23:59:59`,
  };
};

export function getColorForCount(count: number): string {
  // Adjust these thresholds and colors based on your needs
  if (count === 0) return "#ebedf0";
  if (count <= 3) return "#9be9a8";
  if (count <= 6) return "#40c463";
  if (count <= 9) return "#30a14e";
  return "#216e39";
}
