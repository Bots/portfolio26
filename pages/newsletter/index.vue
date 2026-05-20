<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-zinc-900">Newsletter</h1>
        <p class="mt-4 text-lg text-zinc-600 max-w-2xl">
          Thoughts on AI, development, and technology. Published on <a href="https://johnpaulwile.substack.com" target="_blank" rel="noopener" class="text-orange-500 hover:text-orange-600 transition-colors underline">Substack</a>.
        </p>
      </div>

      <div v-if="(posts?.length ?? 0) === 0" class="text-center py-20">
        <p class="text-zinc-500">Loading posts...</p>
      </div>

      <div v-else class="space-y-6">
        <UiCard
          v-for="post in posts"
          :key="post.link"
          class="group hover:shadow-lg transition-shadow"
        >
          <UiCardHeader>
            <div class="flex items-center gap-3 mb-2">
              <UiBadge variant="secondary" class="text-xs">{{ formatDate(post.pubDate) }}</UiBadge>
              <UiBadge v-if="post.creator" variant="secondary" class="text-xs">
                {{ post.creator }}
              </UiBadge>
            </div>
            <UiCardTitle>
              <a
                :href="post.link"
                target="_blank"
                rel="noopener"
                class="text-zinc-900 hover:text-orange-500 transition-colors line-clamp-1"
              >
                {{ post.title }}
              </a>
            </UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-zinc-600 line-clamp-3">
              {{ stripHtml(post.description) }}
            </p>
          </UiCardContent>
          <UiCardFooter>
            <a
              :href="post.link"
              target="_blank"
              rel="noopener"
              class="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              Read full post &rarr;
            </a>
          </UiCardFooter>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useFetch('/api/substack');

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function stripHtml(html: string): string {
  if (!html) return '';
  // Full HTML entity decoder (named + numeric decimal/hex) + tag stripping
  const decoded = html
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '-')
    .replace(/&bull;/g, '•')
    .replace(/&hellip;/g, '…')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/<[^>]*>/g, '')
    .trim();
  return decoded.slice(0, 250) + '...';
}
</script>
