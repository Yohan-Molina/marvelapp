import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';

// Own
// Types
import { Heroe } from '@app/common/types/interfaces/heroe';
// Enums
import { VoteType } from '@app/common/types/enums/vote-type';
// Constants
import { NEWEST_HEROE_ID } from '@app/common/constants/app';
// Services
import { HeroesService } from '@app/common/services/heroes.service';
import { updateHeroeLoadPercentBars } from '@app/common/utils/heroes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  newestHeroe: Heroe | undefined;
  olderHeroes: Heroe[] | undefined;
  userHasVoted = false;
  lastVote: VoteType | undefined;
  voteType = VoteType;
  constructor(private heroesService: HeroesService) {
    this.getHeroesData();
  }

  like(heroe: Heroe): void {
    heroe.likes++;
    this.heroesService.updateHeroe(heroe).then(heroe => {
      this.userHasVoted = true;
      this.lastVote = VoteType.LIKE;
      this.getHeroesData();
      this.updateNewstHeroPercentBars();
    });
  }

  dislike(heroe: Heroe): void {
    heroe.dislikes++;
    this.heroesService.updateHeroe(heroe).then(heroe => {
      this.userHasVoted = true;
      this.lastVote = VoteType.DISLIKE;
      this.getHeroesData();
      this.updateNewstHeroPercentBars();
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

  updateNewstHeroPercentBars(): boolean {
    if (this.newestHeroe) {
      updateHeroeLoadPercentBars(this.newestHeroe);
    }
    return true;
  }

}
