import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletBalanceRoutingModule } from './wallet-balance-routing.module';
import { WalletBalanceComponent } from './wallet-balance.component';


@NgModule({
  declarations: [
    WalletBalanceComponent
  ],
  imports: [
    CommonModule,
    WalletBalanceRoutingModule
  ]
})
export class WalletBalanceModule { }
