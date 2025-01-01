import { GitHubContributionsData } from "../types";
export declare const getDateRange: (year: number) => {
    from: Date;
    to: Date;
};
export declare const getSummaryText: (year: number, data: GitHubContributionsData) => string;
export declare const fetchGitHubContributions: (username: string, token: string, from: Date, to: Date) => Promise<any>;
