<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="mb-12 text-center">
        <h1 class="text-3xl sm:text-4xl font-bold text-zinc-900">Contact</h1>
        <p class="mt-4 text-lg text-zinc-600">
          Have a question, idea, or just want to say hi? Drop me a message.
        </p>
      </div>

      <UiCard class="shadow-sm">
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
            <div class="text-4xl mb-4">✓</div>
            <p class="text-lg font-medium text-zinc-900">Message sent!</p>
            <p class="text-zinc-600 mt-1">I'll get back to you soon.</p>
            <UiButton variant="outline" class="mt-4" @click="resetForm">
              Send another message
            </UiButton>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Direct contact -->
      <div class="mt-12 bg-zinc-50 rounded-xl p-6 sm:p-8">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">Or reach me directly</h3>
        <div class="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:botsone@gmail.com"
            class="flex items-center gap-3 text-zinc-700 hover:text-orange-500 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class="text-sm">botsone@gmail.com</span>
          </a>
          <a
            href="https://twitter.com/jpwile"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-3 text-zinc-700 hover:text-orange-500 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span class="text-sm">@jpwile</span>
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
