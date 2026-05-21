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
  size: number;
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
  size: number;
}

interface ProjectsResponse {
  projects: Project[];
  total: number;
  totalStars: number;
  totalSize: number;
}

export default defineEventHandler(async (): Promise<ProjectsResponse> => {
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

    const projects = repos
      .filter((repo) => !repo.fork && repo.description)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map((repo) => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || '',
        html_url: repo.html_url,
        language: repo.language || '',
        stargazers_count: repo.stargazers_count,
        topics: repo.topics || [],
        updated_at: repo.updated_at,
        size: repo.size || 0,
      }));

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const totalSize = repos.reduce((sum, r) => sum + (r.size || 0), 0);

    return {
      projects,
      total: repos.length,
      totalStars,
      totalSize,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return { projects: [], total: 0, totalStars: 0, totalSize: 0 };
  }
});
