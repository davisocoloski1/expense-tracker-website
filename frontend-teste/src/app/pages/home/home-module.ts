import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Home } from './components/home';
import { VisaoGeralFinanceira } from './components/visao-geral-financeira/visao-geral-financeira';


@NgModule({
  declarations: [
    Home,
    VisaoGeralFinanceira
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
