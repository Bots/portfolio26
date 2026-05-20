<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-zinc-900">Projects</h1>
        <p class="mt-4 text-lg text-zinc-600 max-w-2xl">
          A selection of projects I've built. All available on <a href="https://github.com/bots" target="_blank" rel="noopener" class="text-orange-500 hover:text-orange-600 transition-colors underline">GitHub</a>.
        </p>
      </div>

      <!-- Language filter -->
      <div v-if="languages.length > 1" class="flex flex-wrap gap-2 mb-8">
        <button
          @click="selectedLanguage = ''"
          class="px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
          :class="selectedLanguage === ''
            ? 'bg-orange-500 text-white'
            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'"
        >
          All
        </button>
        <button
          v-for="lang in languages"
          :key="lang"
          @click="selectedLanguage = lang"
          class="px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
          :class="selectedLanguage === lang
            ? 'bg-orange-500 text-white'
            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'"
        >
          {{ lang }}
        </button>
      </div>

      <div v-if="(projects?.length ?? 0) === 0" class="text-center py-20">
        <p class="text-zinc-500">Loading projects...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiCard
          v-for="project in filteredProjects"
          :key="project.full_name"
          class="flex flex-col hover:shadow-lg transition-shadow"
        >
          <UiCardHeader class="pb-2">
            <UiCardTitle class="text-lg">
              <a
                :href="project.html_url"
                target="_blank"
                rel="noopener"
                class="text-zinc-900 hover:text-orange-500 transition-colors"
              >
                {{ project.name }}
              </a>
            </UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="flex-1">
            <p class="text-sm text-zinc-600 line-clamp-3 mb-4">
              {{ project.description }}
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              <UiBadge v-if="project.language" variant="secondary" class="text-xs">
                {{ project.language }}
              </UiBadge>
              <span v-for="topic in project.topics.slice(0, 2)" :key="topic" class="text-xs text-zinc-500">
                #{{ topic }}
              </span>
            </div>
          </UiCardContent>
          <UiCardFooter class="flex items-center gap-4 pt-2">
            <span class="flex items-center gap-1 text-xs text-zinc-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              {{ project.stargazers_count }}
            </span>
            <span class="text-xs text-zinc-500">
              Updated {{ formatDate(project.updated_at) }}
            </span>
          </UiCardFooter>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: projects } = await useFetch('/api/github');
const selectedLanguage = ref('');

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

const languages = computed(() => {
  const langs = new Set((projects.value as Project[] | undefined)?.map((p) => p.language).filter(Boolean));
  return Array.from(langs).sort();
});

const filteredProjects = computed(() => {
  if (!projects.value) return [];
  if (!selectedLanguage.value) return projects.value;
  return (projects.value as Project[]).filter((p) => p.language === selectedLanguage.value);
});

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}
</script>
