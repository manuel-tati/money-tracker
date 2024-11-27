<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';

const router = useRouter()
let routers = router.currentRoute.value.matched;

</script>
<template>
  <Breadcrumb class="flex flex-row space-x-2 items-center font-roboto">
    <BreadcrumbList v-for="(route, index) in routers">
      <BreadcrumbItem v-if="index !== routers.length - 1">
        <BreadcrumbLink :href="'#' + route.path" class="text-xs">
          {{ route.name }}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator v-if="index !== routers.length - 1" />
      <BreadcrumbItem v-if="index === routers.length - 1">
        <BreadcrumbPage class="text-xs">{{ route.name }}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>