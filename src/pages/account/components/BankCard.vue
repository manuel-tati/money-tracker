<script setup lang="ts">
import { AccountResponse } from '@/src/types/account';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

defineProps<{ account: AccountResponse }>()

function onFormatCurrency(currency: string, value: number) {
  const currencyToLocale: any = {
    USD: 'en-US',
    EUR: 'de-DE',
    BRL: 'pt-BR',
    JPY: 'ja-JP',
    GBP: 'en-GB',
    INR: 'hi-IN',
    AOA: 'pt-AO',
  };
  const locale = currencyToLocale[currency] || 'en-US';

  const balance = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: `${currency}`,
  }).format(value);
  return balance;
}

</script>

<template>
  <Card class="w-72">
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-xs font-medium text-slate-500">
        {{ account.institution }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-3xl font-bold text-slate-800">
        {{ onFormatCurrency(account.currency, account.balance) }}
      </div>
    </CardContent>
  </Card>
</template>