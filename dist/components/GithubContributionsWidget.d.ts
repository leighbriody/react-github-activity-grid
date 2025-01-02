import React from "react";
interface GithubContributionsWidgetProps {
    usernames: string[];
    githubApiKey: string;
}
export default function GithubContributionsWidget({ usernames, githubApiKey, }: GithubContributionsWidgetProps): React.JSX.Element;
export {};
