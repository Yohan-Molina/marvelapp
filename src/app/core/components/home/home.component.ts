import { Component, OnInit } from '@angular/core';

// Own
// Types
import { Heroe } from '@app/common/types/interfaces/heroe';
// Constants
import { NEWEST_HEROE_ID } from '@app/common/constants/app';
// Services
import { HeroesService } from '@app/common/services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  newestHeroe: Heroe | undefined;
  olderHeroes: Heroe[] | undefined;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.getHeroesData();
  }

  like(heroe: Heroe): void {
    heroe.likes++;
    this.heroesService.updateHeroe(heroe).then(heroe => {
      this.getHeroesData();
    });
  }

  dislike(heroe: Heroe): void {
    heroe.dislikes++;
    this.heroesService.updateHeroe(heroe).then(heroe => {
      this.getHeroesData();
    });
  }

  private getHeroesData(): void {
    this.findNewestHero();
    this.findOlderHeroes();
  }

  private findNewestHero(): void {
    this.heroesService.getHeroeById(NEWEST_HEROE_ID).then(heroe => {
      this.newestHeroe = heroe;
    });
  }

  private findOlderHeroes(): void {
    this.heroesService.getHeroeByIdNotIn([NEWEST_HEROE_ID]).then(heroes => {
      this.olderHeroes = heroes;
    });
  }

}
