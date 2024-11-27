import { useAxios } from '@vueuse/integrations/useAxios';
import { instance } from '../../config/axios-config';
import useAuth from '../sign/auth';

export function AccountService() {
  const PREFIX = '/accounts';
  const { token } = useAuth();
  return {
    deposit: async (oid: string, amount: number) =>
      useAxios(
        `${PREFIX}/${oid}/deposit`,
        { method: 'PUT', data: { balance: amount } },
        instance(token)
      ),
  };
}
