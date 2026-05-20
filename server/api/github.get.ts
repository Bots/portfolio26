interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

interface Project {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

export default defineEventHandler(async (): Promise<Project[]> => {
  const config = useRuntimeConfig();
  const githubUrl = config.public?.githubApiUrl || 'https://api.github.com/users/Bots/repos';

  try {
    const repos = await $fetch<GitHubRepo[]>(githubUrl, {
      query: {
        sort: 'updated',
        per_page: 100,
        type: 'owner',
      },
    });

    return repos
      .filter((repo) => !repo.fork && repo.description)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 12)
      .map((repo) => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language || '',
        stargazers_count: repo.stargazers_count,
        topics: repo.topics || [],
        updated_at: repo.updated_at,
      }));
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return [];
  }
});
