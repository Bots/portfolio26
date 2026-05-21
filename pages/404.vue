<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="relative inline-block mb-8">
        <h1 class="text-8xl font-bold text-orange-500">404</h1>
        <div class="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-ping" />
      </div>
      <p class="mt-4 text-2xl font-medium text-zinc-900">Page not found</p>
      <p class="mt-2 text-zinc-600">
        Looks like this page got lost in the codebase. Let's get you back on track.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Go home
        </NuxtLink>
        <a
          href="https://johnpaulwile.substack.com"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
        >
          Read the newsletter
        </a>
      </div>
    </div>
  </div>
</template>
