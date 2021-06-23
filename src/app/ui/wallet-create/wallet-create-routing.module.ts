import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletCreateComponent } from './wallet-create.component';

const routes: Routes = [{ path: '', component: WalletCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletCreateRoutingModule { }
