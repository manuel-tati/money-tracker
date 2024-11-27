<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { AxiosError } from 'axios';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserService } from '../../api/endpoints/sign';
import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useToast } from '../ui/toast';
import { formSchema } from './schema';

const router = useRouter()
const service = UserService()
const { toast } = useToast()
let isLoading = ref(false)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onHandleSubmit = handleSubmit(async ({ email, password, username }) => {
  isLoading.value = true;

  try {
    await service.create({
      email: email,
      password: password,
      username: username
    })
    isLoading.value = false;

    toast({
      title: "Success",
      description: "New user created",
      class: "bg-green-600 text-white",
      duration: 7000,
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

})

</script>

<template>
  <div class="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-left">
          <h1 class="text-3xl font-bold">
            Inscrever-se
          </h1>
          <small>Introduza as suas informações para criar uma conta</small>
        </div>
        <form class="grid gap-4" @submit="onHandleSubmit">
          <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
            <FormItem v-auto-animate>
              <FormLabel class="text-xs font-semibold">Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="username" v-bind="componentField" />
              </FormControl>
              <FormMessage class="text-[12px] font-medium" />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
            <FormItem v-auto-animate>
              <FormLabel class="text-xs font-semibold">Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="email" v-bind="componentField" />
              </FormControl>
              <FormMessage class="text-[12px] font-semibold" />
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
            Create account
          </Button>
        </form>
        <div class="mt-4 text-center text-xs">
          Already have an account?
          <RouterLink to="/signin" class="underline text-blue-800 font-medium">
            Sign In
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <!-- <img src="/placeholder.svg" alt="Image" class="w-2/4 object-cover dark:brightness-[0.2] dark:grayscale"> -->
    </div>
  </div>
</template>