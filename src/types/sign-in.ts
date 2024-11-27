export interface SignInRequest {
  username: string
  password: string
}

export interface SignInResponse {
  token: string
}

export interface TokenPayload {
  exp: number
  email: string
  userId: string
}