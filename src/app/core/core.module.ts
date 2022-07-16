import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '@app/core/components/home/home.component';
import { HeroeCardComponent } from './components/home/heroe-card/heroe-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeroeCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
