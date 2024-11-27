<script setup lang="ts">
import { RotateCw } from 'lucide-vue-next';
defineProps({
  message: String
})
</script>


<template>
  <main class="flex flex-row items-center">
    <RotateCw class=" text-blue-500 animate-spin h-4 w-4 mr-2" />
    <small class="font-normal text-blue-400 text-xs"> {{ message }}</small>
  </main>
</template>