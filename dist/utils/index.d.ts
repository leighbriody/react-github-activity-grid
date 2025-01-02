import { GitHubContributionsData } from "../types";
export declare function fetchGitHubContributions(username: string, githubApiKey: string, from: string, to: string): Promise<any>;
export declare function getSummaryText(year: number, contributionsData: GitHubContributionsData[]): string;
export declare const getDateRange: (year: number) => {
    from: string;
    to: string;
};
export declare function getColorForCount(count: number): string;
