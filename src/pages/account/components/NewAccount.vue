<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { AxiosError } from 'axios';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserService } from '../../../api/endpoints/sign';
import { Button } from '../../../components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { useToast } from '../../../components/ui/toast';
import FormLayout from './FormLayout.vue';
import { accountFormSchema } from './schemas/account';

const router = useRouter()
const service = UserService()
const { toast } = useToast()
let isLoading = ref(false)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: accountFormSchema
})
const onHandleSubmit = handleSubmit(async ({ type, name, currency, description, institution }) => {
  isLoading.value = true;
  try {
    await service.createAccount({
      type: type,
      name: name,
      currency: currency,
      description: description || "",
      institution: institution || "",
    })
    isLoading.value = false;

    toast({
      title: "Success",
      description: "Account created!",
      class: "bg-green-600 text-white",
      duration: 3000,
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
  <FormLayout title="Create a new account">
    <form class="grid gap-4 w-full max-w-md " @submit="onHandleSubmit">
      <div class="grid grid-cols-2">
        <FormField v-slot="{ componentField }" name="type" :validate-on-blur="!isFieldDirty">
          <FormItem v-auto-animate>
            <FormLabel class="text-xs font-semibold">Type of account</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger class="w-[220px]">
                  <SelectValue placeholder="Select type of account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup class="text-xs font-medium">
                    <SelectLabel class="text-[12px] font-normal text-slate-500">Account types</SelectLabel>
                    <SelectItem value="CURRENT">
                      Current Account
                    </SelectItem>
                    <SelectItem value="CHECKING">
                      Checking Account
                    </SelectItem>
                    <SelectItem value="SAVING">
                      Savings Account
                    </SelectItem>
                    <SelectItem value="CREDIT_CARD">
                      Credit Card
                    </SelectItem>
                    <SelectItem value="INVESTMENT">
                      Investment
                    </SelectItem>
                    <SelectItem value="CASH">
                      Cash Account
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage class="text-[12px] font-medium" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="currency" :validate-on-blur="!isFieldDirty">
          <FormItem v-auto-animate>
            <FormLabel class="text-xs font-semibold">Currency</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger class="w-[220px]">
                  <SelectValue placeholder="Select type of currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup class="text-xs font-medium">
                    <SelectLabel class="text-[12px] font-normal text-slate-500">Currencies </SelectLabel>
                    <SelectItem value="AOA">
                      Angolan Kwanza (AOA)
                    </SelectItem>
                    <SelectItem value="EUR">
                      Euro (EUR)
                    </SelectItem>
                    <SelectItem value="USD">
                      American Dollar (USD)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage class="text-[12px] font-medium" />
          </FormItem>
        </FormField>
      </div>
      <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
        <FormItem v-auto-animate>
          <FormLabel class="text-xs font-semibold">Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Exp: Manuel Ernesto" v-bind="componentField" />
          </FormControl>
          <FormMessage class="text-[12px] font-medium" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="institution" :validate-on-blur="!isFieldDirty">
        <FormItem v-auto-animate>
          <FormLabel class="text-xs font-semibold">Institution</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Exp: Standard Bank Angola" v-bind="componentField" />
          </FormControl>
          <FormMessage class="text-[12px] font-medium" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="description" :validate-on-blur="!isFieldDirty">
        <FormItem v-auto-animate>
          <FormLabel class="text-xs font-semibold">Type of account</FormLabel>
          <FormControl>
            <Textarea placeholder="Type your message here." v-bind="componentField" />
          </FormControl>
          <FormMessage class="text-[12px] font-medium" />
        </FormItem>
      </FormField>

      <Button class="w-full" size="sm" :disabled="isLoading">
        Create account
      </Button>
    </form>
  </FormLayout>
</template>