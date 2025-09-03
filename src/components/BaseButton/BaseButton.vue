<script setup lang="ts">
defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button class="base-button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>
