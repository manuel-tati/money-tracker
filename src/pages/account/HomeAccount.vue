<script setup lang="ts">
import { AccountResponse } from '@/src/types/account';
import { onMounted, ref } from 'vue';
import { UserService } from '../../api/endpoints/sign';
import { Spinner } from '../../components/spinner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
import { useToast } from '../../components/ui/toast';
import { BankCard } from './components';


let isLoading = ref(false)
let loaded = ref(false)
let accounts = ref<AccountResponse[]>([])
const { toast } = useToast()
const service = UserService()

onMounted(async () => {
  isLoading.value = true
  const { data, isFinished, error } = await service.getAccounts()

  isLoading.value = false
  if (isFinished) {
    accounts.value = data.value
    loaded.value = true
  }
  if (error.value) {
    toast({
      title: "Erro",
      type: "background",
      variant: "destructive",
      description: "Erro ao tentar carregar as contas",
      duration: 5000,
    })
  }
})

</script>
<template>
  <Spinner message="Carregando todas contas..." v-if="isLoading" />
  <Carousel class="relative w-full max-w-4xl mx-auto" :opts="{
    align: 'start',
  }" v-if="loaded">
    <CarouselContent>
      <CarouselItem v-for="(account, index) in accounts" :key="index" class="md:basis-1/2 lg:basis-1/3">
        <BankCard :account="account" v-bind:key="account.accountId" />
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>