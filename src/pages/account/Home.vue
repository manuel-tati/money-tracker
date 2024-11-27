<script setup lang="ts">
import { CustomBreadcrumb } from '.';
import { ContentLayout, Navbar } from './components';
</script>

<template>
  <Navbar />
  <ContentLayout>
    <CustomBreadcrumb />
    <RouterView />
  </ContentLayout>
</template>