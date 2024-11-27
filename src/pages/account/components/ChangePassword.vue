<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { AxiosError } from 'axios';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserService } from '../../../api/endpoints/sign';
import useAuth from '../../../api/endpoints/sign/auth';
import { Button } from '../../../components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/toast';
import { changePasswordFormSchema } from './schemas/change-password';


const auth = useAuth()
const router = useRouter()
let isLoading = ref(false)
const { toast } = useToast()
const service = UserService()

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: changePasswordFormSchema,
})
const onHandleSubmit = handleSubmit(async ({ newPassword, oldPassword }) => {
  isLoading.value = true;
  try {
    await service.changePassword(auth.userId, {
      newPassword: newPassword,
      oldPassword: oldPassword
    })
    isLoading.value = false;

    toast({
      title: "Success",
      description: "Password changed!",
      class: "bg-green-600 text-white",
      duration: 7000,
    })

    router.push("/account")

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
  <main class="font-roboto flex items-center flex-col gap-4 ">
    <h2 class="font-semibold mt-8">Change password</h2>
    <form class="grid gap-4 w-full max-w-md " @submit="onHandleSubmit">
      <span class="text-sm font-lato font-normal mt-6 text-slate-600"> Your new password must be different from previous
        used passwords
      </span>
      <FormField v-slot="{ componentField }" name="oldPassword" :validate-on-blur="!isFieldDirty">
        <FormItem v-auto-animate>
          <FormLabel class="text-xs font-semibold">Old Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="**********" v-bind="componentField" />
          </FormControl>
          <FormMessage class="text-[12px] font-medium" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="newPassword" :validate-on-blur="!isFieldDirty">
        <FormItem v-auto-animate>
          <FormLabel class="text-xs font-semibold">New Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="**********" v-bind="componentField" />
          </FormControl>
          <FormMessage class="text-[12px] font-medium" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="confirm_password" :validate-on-blur="!isFieldDirty">
        <FormItem v-auto-animate>
          <FormLabel class="text-xs font-semibold">Confirm password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="**********" v-bind="componentField" />
          </FormControl>

          <FormDescription class="text-xs">Both passwords must match</FormDescription>
          <FormMessage class="text-[12px] font-medium" />
        </FormItem>
      </FormField>
      <Button class="w-full" size="sm" :disabled="isLoading">
        Change password
      </Button>
    </form>
  </main>
</template>