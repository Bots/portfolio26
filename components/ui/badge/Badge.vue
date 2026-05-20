<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { cn } from '~/lib/utils'

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

interface Props {
  variant?: BadgeVariant
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

function badgeVariants(options: { variant?: BadgeVariant } = {}) {
  const base = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
  const variants: Record<BadgeVariant, string> = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground',
  }
  return cn(base, variants[options.variant || 'default'])
}

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
