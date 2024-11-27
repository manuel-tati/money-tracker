<script setup lang="ts">
import { DepositBalance } from './components/account/deposit';
import HomeAccount from './HomeAccount.vue';
</script>

<template>
  <main class="font-roboto mt-8">
    <div class="flex flex-row justify-between py-2">
      <h2 class="font-semibold">My accounts</h2>
      <div class="flex flex-row gap-2 items-center">
        <DepositBalance />
        <RouterLink to="/account/new-account" class="text-blue-600 font-medium text-xs">New account
        </RouterLink>
      </div>
    </div>
    <HomeAccount />
  </main>
</template>