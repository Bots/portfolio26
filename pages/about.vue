<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Hero -->
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-16">
        <img
          src="/jp.png"
          alt="John Paul Wile"
          class="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover ring-4 ring-orange-500/20"
        />
        <div class="text-center sm:text-left">
          <h1 class="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">John Paul Wile</h1>
          <p class="mt-2 text-lg text-zinc-600 dark:text-zinc-400">Developer, Writer, AI Enthusiast</p>
          <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Colorado Springs, CO
          </p>
        </div>
      </div>

      <!-- Bio -->
      <div class="prose prose-lg max-w-none text-zinc-700 dark:text-zinc-300 mb-16">
        <p>
          I'm a Full-Stack Developer with a passion for building things that work well. Previously at Forward Flow and Red Mountain Scientific.
        </p>
        <p>
          I specialize in JavaScript/TypeScript, Java, React, NextJS, NodeJS, Vue, MySQL, PostgreSQL, Docker, Tailwind, and Shadcn. I like to ship fast, iterate often, and write about what I learn along the way.
        </p>
        <p>
          When I'm not coding, I'm writing about AI and technology on my <a href="https://johnpaulwile.substack.com" target="_blank" rel="noopener" class="text-orange-500 hover:text-orange-600 transition-colors font-medium">Substack newsletter</a>. I also maintain several open-source projects you can find on <a href="https://github.com/bots" target="_blank" rel="noopener" class="text-orange-500 hover:text-orange-600 transition-colors font-medium">GitHub</a>.
        </p>
      </div>

      <!-- Skills -->
      <div class="mb-16">
        <h2 class="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Skills & Technologies</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="category in skillCategories" :key="category.name" class="bg-zinc-50 dark:bg-black dark:hover:bg-zinc-900 rounded-xl p-6 hover:bg-zinc-100/50 transition-colors">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">{{ category.name }}</h3>
            <ul class="space-y-2">
              <li
                v-for="skill in category.skills"
                :key="skill.name"
                class="flex items-center gap-2 text-zinc-700 dark:text-zinc-300"
              >
                <svg class="w-4 h-4 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
                </svg>
                <span>{{ skill }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="mb-16">
        <h2 class="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Experience</h2>
        <div class="space-y-6">
          <div
            v-for="job in experience"
            :key="job.title"
            class="border-l-2 border-orange-200 dark:border-zinc-700 pl-6 py-2 hover:border-orange-400 dark:hover:border-zinc-500 transition-colors"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 class="text-lg font-medium text-zinc-900 dark:text-white">{{ job.title }}</h3>
              <time class="text-sm text-zinc-500">{{ job.period }}</time>
            </div>
            <p class="text-orange-500 font-medium text-sm">{{ job.company }}</p>
            <p class="text-zinc-600 dark:text-zinc-400 mt-2">{{ job.description }}</p>
          </div>
        </div>
      </div>

      <!-- Connect -->
      <div class="pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <h2 class="text-xl font-bold text-zinc-900 dark:text-white mb-6">Connect</h2>
        <div class="flex flex-wrap gap-4">
          <a
            href="https://github.com/bots"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/john-paul-wile/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a
            href="https://twitter.com/jpwile"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Twitter
          </a>
          <a
            href="https://johnpaulwile.substack.com"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.539 8.242H1.46V2.308l10.54 7.154L22.54 8.242zM1.46 21.692V14.2l9.539-5.723L3.96 15.15v6.542H1.46zm12.07-7.2L22.54 21.69V9.75l-9.01 4.743zM12 15.388l-2.79-1.673V20.5L12 17.115 14.79 20.5V13.715L12 15.388z"/></svg>
            Substack
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const skillCategories = [
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'Shadcn', 'TypeScript', 'JavaScript'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Java', 'APIs', 'Docker', 'PostgreSQL'],
  },
  {
    name: 'AI & ML',
    skills: ['LLMs', 'RAG', 'llama.cpp', 'AI Agents', 'Ollama'],
  },
  {
    name: 'DevOps & Tools',
    skills: ['Git', 'CI/CD', 'Vercel', 'AWS', 'Linux'],
  },
];

const experience = [
  {
    title: 'Full-Stack Developer',
    company: 'Freelance',
    period: 'Present',
    description: 'Building scalable web applications and AI-powered products.',
  },
  {
    title: 'Tech Lead / Full-Stack Developer',
    company: 'Forward Flow',
    period: 'Previous',
    description: 'Led development efforts, building scalable web applications and AI-powered products.',
  },
  {
    title: 'Full Stack Developer',
    company: 'Red Mountain Scientific',
    period: 'Previous',
    description: 'Developed and maintained web applications, APIs, and data pipelines.',
  },
];
</script>
