import { GitHubContributionsData } from "../types";

export const getDateRange = (year: number) => {
  const from = new Date(year, 0, 1);
  const to = new Date(year, 11, 31);
  return { from, to };
};

export const getSummaryText = (year: number, data: GitHubContributionsData) => {
  const totalContributions =
    data.data.repositoryOwner.contributionsCollection.contributionCalendar
      .totalContributions;
  return `${totalContributions} contributions in ${year}`;
};

export const fetchGitHubContributions = async (
  username: string,
  token: string,
  from: Date,
  to: Date
) => {
  const query = `query {
      repositoryOwner(login: "${username}") {
        ... on User {
          contributionsCollection(from: "${from.toISOString()}", to: "${to.toISOString()}") {
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
            }
          }
        }
      }
    }`;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  return response.json();
};
