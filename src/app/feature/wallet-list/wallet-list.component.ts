import { Component } from '@angular/core'
import { WalletListStore } from './wallet-list.store'
import { Account } from '../../data-access/interfaces/account'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="md:row">
        <div class="md:col-4 mb-3">
          <div class="btn btn-primary btn-block mb-2" (click)="create()">Create</div>
          <div class="list-group">
            <ng-container *ngFor="let account of vm.accounts">
              <div class="list-group-item d-flex justify-content-between align-items-center">
                <a [routerLink]="account.id">{{ account.label }}</a>
                <span>
                  <a class="btn btn-sm" [attr.href]="account.explorerUrl" target="_blank">Explore</a>
                  <button class="btn btn-sm" (click)="deleteAccount(account)">X</button>
                </span>
              </div>
            </ng-container>
          </div>
        </div>
        <div class="md:col-8">
          <router-outlet></router-outlet>
        </div>
      </div>
    </ng-container>
  `,
  providers: [WalletListStore],
})
export class WalletListComponent {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: WalletListStore) {}

  create(): void {
    this.store.createAccountEffect()
  }

  deleteAccount(account: Account): void {
    this.store.deleteAccountEffect(account)
  }
}
