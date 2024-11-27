<script setup lang="ts">
import { AccountResponse } from '@/src/types/account';
import { AxiosError } from 'axios';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AccountService } from '../../../../../api/endpoints/account';
import { UserService } from '../../../../../api/endpoints/sign';
import { Button } from '../../../../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../../components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../components/ui/form';
import { Input } from '../../../../../components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select';
import { useToast } from '../../../../../components/ui/toast';
import { depositFormSchema } from './schema';

const router = useRouter()
let isOpen = ref(false)
let isLoading = ref(false)
const { toast } = useToast()
const accountService = AccountService()
const userService = UserService()
let userAccounts = ref<AccountResponse[]>([])

const { resetForm, isFieldDirty, handleSubmit } = useForm({
  validationSchema: depositFormSchema
})

async function onHandleOpen() {
  resetForm()
  const { data, isFinished, error } = await userService.getAccounts()
  if (isFinished) {
    userAccounts.value = data.value
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
  isOpen.value = true
}
function onHandleClose() {
  resetForm()
  return isOpen.value = false
}

const onHandleSubmit = handleSubmit(async ({ accountId, balance }) => {
  isLoading.value = true;
  try {
    await accountService.deposit(accountId, balance)
    isLoading.value = false;
    toast({
      title: "Success",
      description: "Amount deposited!",
      class: "bg-green-600 text-white",
      duration: 3000,
    })
    resetForm()
    window.location.reload()

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
  <Dialog :open="isOpen" @update:open="onHandleClose">
    <DialogTrigger as-child>
      <Button type="button" variant="ghost" @click="onHandleOpen" size="xs"
        class="bg-transparent flex flex-row hover:bg-transparent hover:text-slate-600">
        <small>Deposit</small>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Deposit balance</DialogTitle>
      </DialogHeader>
      <form class="grid gap-4 w-full max-w-md " @submit="onHandleSubmit">
        <FormField v-slot="{ componentField }" name="accountId" :validate-on-blur="!isFieldDirty">
          <FormItem v-auto-animate>
            <FormLabel class="text-xs font-semibold">Select a account</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select type of account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup class="text-xs font-medium" v-for="(account, index) in userAccounts" :key="index">
                    <SelectItem :value="account.accountId">
                      <div class="flex flex-col">
                        <span class="text-xs font-semibold">{{ account.name }}</span>
                        <small class="text-slate-500" v-if="account?.institution">{{ account?.institution }}</small>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage class="text-[12px] font-medium" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="balance" :validate-on-blur="!isFieldDirty">
          <FormItem v-auto-animate>
            <FormLabel class="text-xs font-semibold">Amount</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Exp: 200.00" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-[12px] font-medium" />
          </FormItem>
        </FormField>
        <Button class="w-full" size="sm" :disabled="isLoading">
          Deposit
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>