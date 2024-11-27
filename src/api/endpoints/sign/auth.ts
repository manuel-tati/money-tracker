import { SignInRequest, TokenPayload } from "@/src/types/sign-in";
import { useAxios } from '@vueuse/integrations/useAxios';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useJwt } from '@vueuse/integrations/useJwt';


import { ref } from "vue";
import { instance } from "../../config/axios-config";


export function AuthService() {
  return (
    {
      auth: async (request: SignInRequest) => useAxios(`login`, { method: "POST", data: request }, instance()),
    }
  )
}

export function isSignedIn() {
  const token = getToken()
  if (!token)
    return false;

  const encodedJwt = ref(token)
  const { payload } = useJwt(encodedJwt)

  try {
    const { exp: expiration } = payload.value as TokenPayload;
    const isExpired = !!expiration && Date.now() > expiration * 1000;
    return isExpired ? false : true;
  } catch (_) {
    return false;
  }
}
export default function useAuth() {
  const token = getToken()
  const encodedJwt = ref(token)
  const { payload } = useJwt(encodedJwt)
  const { userId, email } = payload.value as TokenPayload;
  return {
    userId, email, token
  }
}

export function logout() {
  const cookie = useCookies(['token'])
  cookie.remove('token')
  return window.location.reload()
}


function getToken(): string {
  const cookie = useCookies(['token'])
  const token = cookie.get('token')
  return token;
}