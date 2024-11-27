export interface SignUpRequest {
  email: string
  username: string
  password: string
}
export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}
