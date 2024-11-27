<script setup lang="ts">
import { SignInResponse } from '@/src/types/sign-in';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { AxiosError } from 'axios';
import { LoaderCircle } from "lucide-vue-next";
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../../api/endpoints/sign/auth';
import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useToast } from '../ui/toast';
import { formSchema } from './schema';



let isLoading = ref(false)
const router = useRouter()
const { toast } = useToast()
const service = AuthService()


const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onHandleSubmit = handleSubmit(async ({ username, password }) => {
  isLoading.value = true;

  try {
    const resp = await service.auth({
      password: password,
      username: username
    })
    isLoading.value = false;
    const response = resp.data.value as SignInResponse
    let cookie = useCookies(['token'])
    cookie.set('token', response.token)
    router.push('/account')
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

})

</script>

<template>
  <div class="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-left">
          <h1 class="text-3xl font-bold">
            Login
          </h1>
        </div>
        <form class="grid gap-4" @submit="onHandleSubmit">
          <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
            <FormItem v-auto-animate>
              <FormLabel class="text-xs font-medium">Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="username" v-bind="componentField" />
              </FormControl>
              <FormMessage class="text-[12px] font-medium" />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
            <FormItem v-auto-animate>
              <FormLabel class="text-xs font-medium">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" v-bind="componentField" />
              </FormControl>
              <FormMessage class="text-[12px] font-medium" />
            </FormItem>
          </FormField>
          <Button class="w-full" size="sm" :disabled="isLoading">
            <LoaderCircle class="animate-spin h-5 w-5 mr-3" v-if="isLoading" />
            Login
          </Button>
        </form>
        <div class="mt-4 text-center text-xs">
          You don't have an account?
          <RouterLink to="/signup" class="underline text-blue-800 font-medium">
            Sign Up
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <!-- <img src="/placeholder.svg" alt="Image" class="w-2/4 object-cover dark:brightness-[0.2] dark:grayscale"> -->
    </div>
  </div>
</template>