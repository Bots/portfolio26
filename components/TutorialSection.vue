<template>
  <section id="section" class="scroll-mt-20">
    <!-- Section header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-3">
        <span class="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-sm">{{ step }}</span>
        <h2 class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">{{ title }}</h2>
      </div>
      <p v-if="subtitle" class="text-zinc-600 dark:text-zinc-400 text-lg">{{ subtitle }}</p>
    </div>

    <!-- Content -->
    <div class="space-y-6">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  step: number | string;
  title: string;
  subtitle?: string;
}>();
</script>
