import { AccountRequest } from '@/src/types/account';
import {
  ChangePasswordRequest,
  SignUpRequest,
} from '@/src/types/sign-up';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance } from '../../config/axios-config';
import useAuth from './auth';

export function UserService() {
  const PREFIX = '/users';
  const { token, userId } = useAuth();
  return {
    deleteAccount: async () =>
      useAxios(
        `${PREFIX}/${userId}`,
        { method: 'DELETE' },
        instance(token)
      ),
    create: async (request: SignUpRequest) =>
      useAxios(
        `${PREFIX}`,
        { method: 'POST', data: request },
        instance(token)
      ),
    createAccount: async (request: AccountRequest) =>
      useAxios(
        `${PREFIX}/${userId}/accounts`,
        { method: 'POST', data: request },
        instance(token)
      ),
    getAccounts: async () =>
      useAxios(
        `${PREFIX}/${userId}/accounts`,
        { method: 'GET' },
        instance(token)
      ),
    changePassword: async (
      oid: string,
      request: ChangePasswordRequest
    ) =>
      useAxios(
        `${PREFIX}/${oid}/new-password`,
        { method: 'PUT', data: request },
        instance(token)
      ),
  };
}
