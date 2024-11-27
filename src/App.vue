<script setup lang="ts">
import { Toaster } from './components/ui/toast';
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" />
  </router-view>
  <Toaster />
</template>
