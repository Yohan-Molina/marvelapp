import { Component, OnInit } from '@angular/core';
import { NEWEST_HEROE_ID } from '@app/common/constants/app';
import { HeroesService } from '@app/common/services/heroes.service';
import { Heroe } from '@app/common/types/interfaces/heroe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  newestHeroe: Heroe | null = null;
  olderHeroes: Heroe[] | null = null;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.findNewestHero();
    this.findOlderHeroes();
  }

  private findNewestHero(): void {
    this.heroesService.getHeroeById(NEWEST_HEROE_ID).then(heroe => {
      this.newestHeroe = heroe;
      console.log(this.newestHeroe);
    });
  }

  private findOlderHeroes(): void {
    this.heroesService.getHeroeByIdNotIn([NEWEST_HEROE_ID]).then(heroes => {
      this.olderHeroes = heroes;
      console.log(this.olderHeroes);
    });
  }

}
