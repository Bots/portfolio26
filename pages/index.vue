<template>
  <div>
    <!-- Hero -->
    <section class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 max-w-4xl mx-auto text-left sm:text-left">
        <div
          class="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-center bg-cover bg-no-repeat ring-4 ring-orange-500/20 flex-shrink-0"
          style="background-image: url('/jp2.jpg');"
        />
        <div class="text-center sm:text-left">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight">
            John Paul Wile
          </h1>
          <p class="mt-4 text-lg sm:text-xl text-zinc-600 max-w-2xl">
            I break things quickly and write about AI tech.
          </p>
          <p class="mt-2 text-sm text-zinc-500">Full-Stack Developer & Writer · Colorado Springs, CO</p>
          <div class="mt-8 flex flex-wrap items-center justify-start gap-4">
          <a
            href="https://johnpaulwile.substack.com"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Read the Newsletter
          </a>
          <NuxtLink
            to="/projects"
            class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            View Projects
          </NuxtLink>
        </div>
      </div>
    </div>
    </section>

    <!-- Recent Newsletter Posts -->
    <section v-if="(posts?.length ?? 0) > 0" class="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-900">Latest Posts</h2>
          <NuxtLink to="/newsletter" class="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
            View all &rarr;
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard
            v-for="post in posts.slice(0, 3)"
            :key="post.link"
            class="flex flex-col hover:shadow-lg transition-shadow"
          >
            <UiCardHeader class="pb-2">
              <UiBadge variant="secondary" class="w-fit text-xs">{{ formatDate(post.pubDate) }}</UiBadge>
            </UiCardHeader>
            <UiCardTitle>
              <a
                :href="post.link"
                target="_blank"
                rel="noopener"
                class="text-zinc-900 hover:text-orange-500 transition-colors line-clamp-2"
              >
                {{ post.title }}
              </a>
            </UiCardTitle>
            <UiCardDescription class="flex-1 line-clamp-3 mt-2">
              <span v-html="stripHtml(post.description)" />
            </UiCardDescription>
            <UiCardFooter>
              <a
                :href="post.link"
                target="_blank"
                rel="noopener"
                class="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
              >
                Read on Substack &rarr;
              </a>
            </UiCardFooter>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- About Preview -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">About Me</h2>
        <p class="text-zinc-600 text-lg max-w-2xl mx-auto mb-8">
          Full-Stack Developer & Tech Lead from Colorado Springs. I build things, break them, and write about what I learn along the way.
        </p>
        <NuxtLink
          to="/about"
          class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Learn More
        </NuxtLink>
      </div>
    </section>

    <!-- Projects Preview -->
    <section v-if="(projects?.length ?? 0) > 0" class="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-900">Featured Projects</h2>
          <NuxtLink to="/projects" class="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
            View all &rarr;
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard
            v-for="project in projects.slice(0, 3)"
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
            <UiCardDescription class="flex-1 line-clamp-3">
              <span v-html="project.description || 'No description available.'" />
            </UiCardDescription>
            <UiCardFooter class="flex items-center gap-3 mt-2">
              <UiBadge v-if="project.language" variant="secondary" class="text-xs">
                {{ project.language }}
              </UiBadge>
              <span class="flex items-center gap-1 text-xs text-zinc-500">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                {{ project.stargazers_count }}
              </span>
            </UiCardFooter>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Subscribe CTA -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center bg-zinc-900 rounded-2xl p-8 sm:p-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p class="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
          Get my latest thoughts on AI, development, and technology delivered to your inbox.
        </p>
        <a
          href="https://johnpaulwile.substack.com"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-zinc-900 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Subscribe on Substack
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useFetch('/api/substack');
const { data: projects } = await useFetch('/api/github');

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function stripHtml(html: string): string {
  if (!html) return '';
  return (
    html
      .replace(/<[^>]*>/g, '')
      .trim()
      .slice(0, 150) + '...'
  );
}
</script>
