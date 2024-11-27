<script setup lang="ts">
import { AxiosError } from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserInfo } from '.';
import { UserService } from '../../../api/endpoints/sign';
import useAuth from '../../../api/endpoints/sign/auth';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/toast';

const router = useRouter()
let isLoading = ref(false)
const { email } = useAuth()
const { toast } = useToast()
const service = UserService()

const onHandleSubmit = async () => {
  isLoading.value = true;
  try {
    await service.deleteAccount()
    isLoading.value = false;

    toast({
      title: "Success",
      description: "Account deleted!",
      class: "bg-green-600 text-white",
      duration: 5000,
    })

    router.push("/signin")

  } catch (error) {
    const err = error as AxiosError
    const msg = err.response?.data as any
    toast({
      title: "Erro",
      type: "background",
      variant: "destructive",
      description: msg?.message ?? err.message,
      duration: 7000,
    })
    isLoading.value = false
  }
}
</script>

<template>
  <main class="font-roboto flex items-center flex-col gap-4 ">
    <h2 class="font-semibold mt-8">User info</h2>
    <div class="grid gap-4 w-full max-w-md ">
      <UserInfo :get-value="email" get-label="E-mail" />
      <Button @click="onHandleSubmit" class="w-full" size="sm" variant="destructive" :disabled="isLoading">
        Delete account
      </Button>
    </div>
  </main>
</template>