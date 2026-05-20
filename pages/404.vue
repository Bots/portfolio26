<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-8xl font-bold text-orange-500">404</h1>
      <p class="mt-4 text-2xl font-medium text-zinc-900">Page not found</p>
      <p class="mt-2 text-zinc-600">The page you're looking for doesn't exist.</p>
      <NuxtLink
        to="/"
        class="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
      >
        Go home
      </NuxtLink>
    </div>
  </div>
</template>
