import { Wallet } from '@kin-sdk/client'

export interface Account extends Wallet {
  label?: string
}
