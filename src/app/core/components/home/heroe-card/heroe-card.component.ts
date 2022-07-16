import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '@app/common/types/interfaces/heroe';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.sass']
})
export class HeroeCardComponent implements OnInit {
  @Input("heroe") heroe: Heroe | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
