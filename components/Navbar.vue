<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 transition-shadow"
    :class="{ 'shadow-sm': isScrolled }"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-zinc-900 hover:text-orange-500 transition-colors flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">JP</span>
          <span class="hidden sm:inline">John Paul Wile</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'text-sm font-medium transition-colors relative py-1',
              isActive(item.path) ? 'text-orange-500' : 'text-zinc-600 hover:text-orange-500'
            ]"
          >
            {{ item.label }}
            <span v-if="isActive(item.path)" class="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          </NuxtLink>
          <a
            href="https://johnpaulwile.substack.com"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Subscribe
          </a>
        </div>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 text-zinc-600 hover:text-zinc-900"
          @click="isOpen = !isOpen"
        >
          <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- Page title -->
      <div v-if="currentPage" class="hidden md:flex h-8 items-center">
        <span class="text-sm font-medium text-zinc-500">{{ currentPage }}</span>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="isOpen" class="md:hidden bg-white border-b border-zinc-200">
      <div class="px-4 py-4 space-y-3">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'block text-sm font-medium transition-colors py-2',
            isActive(item.path) ? 'text-orange-500' : 'text-zinc-600 hover:text-orange-500'
          ]"
          @click="isOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <a
          href="https://johnpaulwile.substack.com"
          target="_blank"
          rel="noopener"
          class="block text-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          @click="isOpen = false"
        >
          Subscribe
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const isOpen = ref(false);
const isScrolled = ref(false);

// Scroll detection for navbar shadow
onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10;
  }, { passive: true });
});

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Newsletter', path: '/newsletter' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

// Better active state detection for nested routes
function isActive(path: string): boolean {
  return route.path === path || (path !== '/' && route.path.startsWith(path));
}

const currentPage = computed(() => {
  const found = navItems.find((item) => isActive(item.path));
  return found ? found.label : '';
});
</script>
