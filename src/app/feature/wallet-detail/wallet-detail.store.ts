import { ComponentStore } from '@ngrx/component-store'
import { pluck, tap, withLatestFrom } from 'rxjs/operators'
import { Account } from '../../data-access/interfaces/account'
import { WalletListStore } from '../wallet-list/wallet-list.store'
import { ActivatedRoute } from '@angular/router'
import { Injectable } from '@angular/core'
import { KinClient, KinTest } from '@kin-sdk/client'

interface WalletDetailState {
  account?: Account
}

@Injectable()
export class WalletDetailStore extends ComponentStore<WalletDetailState> {
  readonly client = new KinClient(KinTest)
  constructor(private readonly list: WalletListStore, route: ActivatedRoute) {
    super({})
    this.loadAccountEffect(route.params.pipe(pluck('accountId')))
  }

  readonly accounts$ = this.select(this.list.vm$, (s) => s.accounts)
  readonly account$ = this.select((s) => s.account)
  readonly vm$ = this.select(this.account$, (account) => ({ account }))

  readonly loadAccountEffect = this.effect<string>((accountId$) =>
    accountId$.pipe(
      withLatestFrom(this.accounts$),
      tap(([accountId, accounts]) => {
        console.log([accountId, accounts])
        const account = accounts!.find((a) => a.id === accountId)
        this.patchState({ account })
      }),
    ),
  )

  readonly getBalanceEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        console.log('getBalance')
      }),
    ),
  )
}
