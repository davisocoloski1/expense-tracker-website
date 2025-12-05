import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarTransacao } from './adicionar-transacao/adicionar-transacao';

const routes: Routes = [
  {
    path: 'add',
    component: AdicionarTransacao
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciadorTransacoesRoutingModule { }
