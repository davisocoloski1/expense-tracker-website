import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenciadorTransacoesRoutingModule } from './gerenciador-transacoes-routing-module';
import { AdicionarTransacao } from './adicionar-transacao/adicionar-transacao';
import { ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";


@NgModule({
  declarations: [
    AdicionarTransacao
  ],
  imports: [
    CommonModule,
    GerenciadorTransacoesRoutingModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule
]
})
export class GerenciadorTransacoesModule { }
