import { Component } from '@angular/core'
import { WalletDetailStore } from './wallet-detail.store'
import { KinClient, KinTest, Wallet } from '@kin-sdk/client'
import { Account } from '../../data-access/interfaces/account'

const client = new KinClient(KinTest)

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="!created">
        <button class="btn btn-secondary mr-2" (click)="createAccount(vm.account!)">Create Account</button>
      </ng-container>

      <button class="btn btn-secondary mr-2" (click)="getBalances(vm.account!)">Get Balances</button>

      <button class="btn btn-secondary mr-2" (click)="requestAirdrop(vm.account!)">Request Airdrop</button>
      <button class="btn btn-secondary mr-2" (click)="submitPayment(vm.account!)">Submit Payment</button>

      <hr />
      <pre>{{ vm.account | json }}</pre>
      <pre>{{ result1 }}</pre>
      <pre>{{ result2 }}</pre>
      <pre>{{ result3 }}</pre>
      <pre>{{ result4 }}</pre>
    </ng-container>
  `,
  providers: [WalletDetailStore],
})
export class WalletDetailComponent {
  readonly vm$ = this.store.vm$

  created = false
  wallet?: Wallet
  result1?: string
  result2?: string
  result3?: string
  result4?: string

  constructor(private readonly store: WalletDetailStore) {}

  async createAccount(account: Account): Promise<void> {
    this.result1 = 'createAccount'
    const [res, err] = await client.createAccount(account?.secret!)
    if (err) {
      this.result1 = JSON.stringify(err)
    } else {
      this.result1 = JSON.stringify(res, null, 2)
      this.created = true
    }
  }

  async getBalances(account: Account): Promise<void> {
    this.result2 = 'getBalances'
    const [res, err] = await client.getBalances(account?.publicKey!)
    if (err) {
      this.result2 = JSON.stringify(err)
    } else {
      this.result2 = JSON.stringify(res, null, 2)
    }
  }

  async requestAirdrop(account: Account): Promise<void> {
    this.result3 = 'requestAirdrop'
    const [res, err] = await client.requestAirdrop(account?.publicKey!, '1000')
    if (err) {
      this.result3 = JSON.stringify(err)
    } else {
      this.result3 = JSON.stringify(res, null, 2)
      await this.getBalances(account)
    }
  }

  async submitPayment(account: Account): Promise<void> {
    this.result4 = 'submitPayment'
    const [res, err] = await client.submitPayment({
      secret: account?.secret!,
      tokenAccount: account?.publicKey!,
      amount: '1',
      destination: 'Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ',
    })
    if (err) {
      this.result4 = JSON.stringify(err)
    } else {
      this.result4 = JSON.stringify(res, null, 2)
      await this.getBalances(account)
    }
  }
}
