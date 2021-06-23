import { ComponentStore } from '@ngrx/component-store'
import { createWallet, elipsify, getExplorerUrl, KinEnvironment } from '@kin-sdk/client'
import { map } from 'rxjs/operators'
import { Account } from '../../data-access/interfaces/account'
import { Injectable } from '@angular/core'

interface WalletListState {
  accounts?: Account[]
}

const KEY = '@@_WALLETS'

function getAccounts(): Account[] {
  const accounts = localStorage.getItem(KEY)
  if (accounts) {
    return JSON.parse(accounts) as Account[]
  }
  return []
}

function storeAccounts(accounts: Account[]): Account[] {
  localStorage.setItem(KEY, JSON.stringify([...accounts]))
  return getAccounts()
}

function storeAccount(account: Account): Account[] {
  return storeAccounts([account, ...getAccounts()])
}

@Injectable()
export class WalletListStore extends ComponentStore<WalletListState> {
  constructor() {
    super({ accounts: [] })
    this.loadAccountEffect()
  }

  readonly accounts$ = this.select((s) => s.accounts)
  readonly vm$ = this.select(this.accounts$, (accounts) => ({ accounts }))

  readonly loadAccountEffect = this.effect(($) =>
    $.pipe(
      map(() => getAccounts()),
      map((accounts) => this.patchState({ accounts })),
    ),
  )

  readonly saveAccountEffect = this.effect<Account>((account$) =>
    account$.pipe(
      map((account) => storeAccount(account)),
      map(() => this.loadAccountEffect()),
    ),
  )

  readonly createAccountEffect = this.effect(($) =>
    $.pipe(
      map(() => createWallet('create')),
      map((wallet) =>
        this.saveAccountEffect({
          ...wallet,
          id: wallet.publicKey!.slice(0, 8),
          label: elipsify(wallet.publicKey),
          explorerUrl: getExplorerUrl(KinEnvironment.Test, wallet.publicKey!),
        }),
      ),
    ),
  )

  readonly deleteAccountEffect = this.effect<Account>((account$) =>
    account$.pipe(
      map((account) => {
        const updated = getAccounts().filter((item) => item.publicKey !== account.publicKey)
        storeAccounts(updated)
      }),
      map((wallet) => this.loadAccountEffect()),
    ),
  )
}
