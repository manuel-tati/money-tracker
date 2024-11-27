<script setup lang="ts">
defineProps({
  title: String
})
</script>
<template>
  <main class="font-roboto flex items-center flex-col gap-4 ">
    <h2 class="font-semibold mt-8">{{ title }}</h2>
    <slot />
  </main>
</template>