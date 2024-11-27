<script setup lang="ts">
import { Profile } from '.';
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
    <div class="max-w-5xl mx-auto">
      <div class="py-2 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
        <div class="relative flex items-center">
          <h3 class="text-xl font-anton">Money Tracker</h3>
          <div class="relative hidden lg:flex items-center ml-auto">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  </header>

</template>