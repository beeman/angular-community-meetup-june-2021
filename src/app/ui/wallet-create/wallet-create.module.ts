import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletCreateRoutingModule } from './wallet-create-routing.module';
import { WalletCreateComponent } from './wallet-create.component';


@NgModule({
  declarations: [
    WalletCreateComponent
  ],
  imports: [
    CommonModule,
    WalletCreateRoutingModule
  ]
})
export class WalletCreateModule { }
