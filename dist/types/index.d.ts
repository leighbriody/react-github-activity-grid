export interface ContributionDay {
    contributionCount: number;
    date: string;
    color: string;
    weekday: number;
}
export interface ContributionWeek {
    contributionDays: ContributionDay[];
    firstDay: string;
}
interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}
interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}
export interface GitHubContributionsData {
    data: {
        repositoryOwner: {
            login: string;
            contributionsCollection: {
                contributionCalendar: ContributionCalendar;
                contributionYears: number[];
            };
        };
    };
}
export {};
