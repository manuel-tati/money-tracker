export interface AccountRequest {
  name: string
  type: string
  currency: string
  institution: string
  description: string
}
export interface AccountResponse {
  name: string
  type: string
  userId: string
  balance: number
  currency: string
  accountId: string
  updatedAt?: string
  createdAt?: string
  isClosed?: boolean
  institution?: string
  description?: string
}