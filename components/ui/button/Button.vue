<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from '~/lib/utils'

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

interface Props {
  as?: string
  variant?: ButtonVariant
  size?: ButtonSize
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})

function buttonVariants(options: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  const variants: Record<ButtonVariant, string> = {
    default: 'bg-orange-500 text-white hover:bg-orange-600',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  }
  const sizes: Record<ButtonSize, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  }
  return cn(base, variants[options.variant || 'default'], sizes[options.size || 'default'])
}
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
