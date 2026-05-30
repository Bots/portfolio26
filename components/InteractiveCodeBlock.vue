<template>
  <div class="my-6 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
    <!-- Header -->
    <div class="bg-orange-50 dark:bg-orange-950/30 px-4 py-3 border-b border-orange-100 dark:border-orange-900/50 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <span class="text-sm font-medium text-orange-800 dark:text-orange-300">Your Turn</span>
      </div>
      <span v-if="explanation" class="text-xs px-2 py-1 rounded-full bg-orange-200/50 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300">
        {{ difficulty }}
      </span>
    </div>

    <div class="bg-white dark:bg-zinc-900 p-4">
      <!-- Explanation of what they're building -->
      <p v-if="explanation" class="text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
        {{ explanation }}
      </p>

      <!-- Description / what to code -->
      <p v-if="description" class="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
        {{ description }}
      </p>

      <!-- Helpful guide showing the pattern -->
      <div v-if="guide" class="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-md">
        <p class="text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">Pattern to follow:</p>
        <pre class="text-xs text-blue-700 dark:text-blue-400 font-mono overflow-x-auto whitespace-pre-wrap">{{ guide }}</pre>
      </div>

      <!-- Code editor -->
      <div class="relative">
        <textarea
          :value="code"
          @input="onInput"
          :placeholder="placeholder"
          class="w-full font-mono text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-green-400 p-4 rounded-md min-h-[180px] resize-y focus:outline-none focus:ring-2 focus:ring-orange-500/50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 leading-relaxed"
          spellcheck="false"
        />
      </div>

      <!-- Action buttons -->
      <div class="flex items-center gap-3 mt-3 flex-wrap">
        <button
          @click="check"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            showResult === true
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200'
              : showResult === false
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200'
                : 'bg-orange-500 text-white hover:bg-orange-600'
          ]"
        >
          {{ showResult === null ? 'Check Answer' : showResult === true ? 'Correct! ✓' : 'Not quite — try again' }}
        </button>

        <button
          @click="addHint"
          class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          {{ hintLevel === 0 ? 'Show Hint' : `Hint ${hintLevel}/3` }}
        </button>

        <button
          v-if="showSolutionOpen"
          @click="showSolutionOpen = false"
          class="px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 rounded-md hover:bg-orange-100 dark:hover:bg-orange-950/50 transition-colors"
        >
          Hide solution
        </button>

        <button
          v-if="showResult !== null || showSolutionOpen"
          @click="reset"
          class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <!-- Hint 1: Basic hint -->
      <Transition name="hint">
        <div v-if="showHint && hintLevel >= 1 && hint" class="mt-3 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md border border-amber-200 dark:border-amber-900/50">
          <strong>Hint 1:</strong> {{ hint }}
        </div>
      </Transition>

      <!-- Hint 2: More detail -->
      <Transition name="hint">
        <div v-if="showHint && hintLevel >= 2 && hintDetail" class="mt-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md border border-amber-200 dark:border-amber-900/50">
          <strong>Hint 2:</strong> {{ hintDetail }}
        </div>
      </Transition>

      <!-- Hint 3: Near-solution -->
      <Transition name="hint">
        <div v-if="showHint && hintLevel >= 3 && hintFull" class="mt-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md border border-amber-200 dark:border-amber-900/50">
          <strong>Hint 3:</strong> {{ hintFull }}
        </div>
      </Transition>

      <!-- Solution -->
      <Transition name="hint">
        <div v-if="showSolutionOpen && solution" class="mt-3">
          <pre class="p-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-green-400 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">{{ solution }}</pre>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const hintLevel = ref(0);
const showHint = ref(false);
const showSolutionOpen = ref(false);

withDefaults(
  defineProps<{
    description?: string;
    placeholder?: string;
    hint?: string;
    hintDetail?: string;
    hintFull?: string;
    explanation?: string;
    guide?: string;
    checkFn?: (code: string) => boolean;
    solution?: string;
    difficulty?: string;
  }>(),
  {
    description: '',
    placeholder: '# Write your code here...',
    hint: '',
    hintDetail: '',
    hintFull: '',
    explanation: '',
    guide: '',
    difficulty: 'Easy',
  },
);

const code = ref('');
const showResult = ref<boolean | null>(null);

function onInput(e: Event) {
  code.value = (e.target as HTMLTextAreaElement).value;
}

function check() {
  if (props.checkFn) {
    showResult.value = props.checkFn(code.value.trim());
  } else {
    // Default: accept non-empty input
    showResult.value = code.value.trim().length > 0;
  }
}

function addHint() {
  showHint.value = true;
  hintLevel.value = Math.min(hintLevel.value + 1, 3);
}

function reset() {
  code.value = '';
  showResult.value = null;
  showSolutionOpen.value = false;
  showHint.value = false;
  hintLevel.value = 0;
}
</script>

<style scoped>
.hint-enter-active {
  transition: all 0.3s ease-out;
}
.hint-leave-active {
  transition: all 0.2s ease-in;
}
.hint-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.hint-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
