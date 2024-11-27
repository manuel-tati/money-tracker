<script setup lang="ts">

defineProps({
  getLabel: String,
  getValue: String
})

</script>
<template>
  <div class="grid gap-2">
    <small class="text-slate-600 font-medium">{{ getLabel }}</small>
    <span>{{ getValue }}</span>
  </div>
</template>