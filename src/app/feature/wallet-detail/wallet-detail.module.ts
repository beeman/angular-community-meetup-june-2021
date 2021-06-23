import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WalletDetailComponent } from './wallet-detail.component'

@NgModule({
  declarations: [WalletDetailComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: WalletDetailComponent }])],
})
export class WalletDetailModule {}
