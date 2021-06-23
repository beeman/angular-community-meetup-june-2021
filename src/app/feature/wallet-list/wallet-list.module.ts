import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WalletListComponent } from './wallet-list.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [WalletListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WalletListComponent,
        children: [
          {
            path: ':accountId',
            loadChildren: () => import('../wallet-detail/wallet-detail.module').then((m) => m.WalletDetailModule),
          },
        ],
      },
    ]),
  ],
})
export class WalletListModule {}
