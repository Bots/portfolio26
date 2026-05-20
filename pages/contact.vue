<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <div class="mb-12 text-center">
        <h1 class="text-3xl sm:text-4xl font-bold text-zinc-900">Contact</h1>
        <p class="mt-4 text-lg text-zinc-600">
          Have a question, idea, or just want to say hi? Drop me a message.
        </p>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Send a Message</UiCardTitle>
          <UiCardDescription>
            I'll get back to you as soon as possible.
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <form
            v-if="!submitted"
            class="space-y-6"
            @submit="(e) => { e.preventDefault(); handleSubmit(); }"
          >
            <div v-if="error" class="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {{ error }}
            </div>

            <div v-if="success" class="p-3 text-sm text-green-600 bg-green-50 rounded-lg">
              Message sent! I'll get back to you soon.
            </div>

            <div>
              <label for="name" class="block text-sm font-medium text-zinc-700 mb-1">
                Name
              </label>
              <UiInput
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-zinc-700 mb-1">
                Email
              </label>
              <UiInput
                id="email"
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-zinc-700 mb-1">
                Message
              </label>
              <UiTextarea
                id="message"
                v-model="form.message"
                placeholder="What's on your mind?"
                rows="5"
                required
              />
            </div>

            <UiButton type="submit" class="w-full" :disabled="loading">
              {{ loading ? 'Sending...' : 'Send Message' }}
            </UiButton>
          </form>

          <div v-else class="text-center py-8">
            <p class="text-zinc-600">Message sent! I'll get back to you soon.</p>
            <UiButton variant="outline" class="mt-4" @click="resetForm">
              Send another message
            </UiButton>
          </div>
        </UiCardContent>
      </UiCard>

      <div class="mt-12 text-center">
        <p class="text-sm text-zinc-500 mb-4">Or reach me directly</p>
        <div class="flex items-center justify-center gap-4">
          <a
            href="https://github.com/bots"
            target="_blank"
            rel="noopener"
            class="text-zinc-400 hover:text-orange-500 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.765.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/john-paul-wile/"
            target="_blank"
            rel="noopener"
            class="text-zinc-400 hover:text-orange-500 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/jpwile"
            target="_blank"
            rel="noopener"
            class="text-zinc-400 hover:text-orange-500 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  message: '',
});

const loading = ref(false);
const error = ref('');
const submitted = ref(false);
const success = ref(false);

async function handleSubmit() {
  error.value = '';
  loading.value = true;

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    });
    success.value = true;
    submitted.value = true;
  } catch (err: unknown) {
    const errorData = err as { data?: { statusMessage?: string } };
    error.value = errorData?.data?.statusMessage || 'Failed to send message. Please try again.';
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  form.name = '';
  form.email = '';
  form.message = '';
  submitted.value = false;
  success.value = false;
  error.value = '';
}
</script>
