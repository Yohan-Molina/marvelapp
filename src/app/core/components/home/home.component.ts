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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit {
  newestHeroe: Heroe | undefined;
  olderHeroes: Heroe[] | undefined;
  userHasVoted = false;
  lastVote: VoteType | undefined;
  voteType = VoteType;
  constructor(private heroesService: HeroesService) {
    this.getHeroesData();
  }

  ngAfterViewInit(): void {
    this.updateNewestHeroeLoadPercentBars();
  }

  like(heroe: Heroe): void {
    heroe.likes++;
    this.heroesService.updateHeroe(heroe).then(heroe => {
      this.userHasVoted = true;
      this.lastVote = VoteType.LIKE;
      this.getHeroesData();
      this.updateNewestHeroeLoadPercentBars();
    });
  }

  dislike(heroe: Heroe): void {
    heroe.dislikes++;
    this.heroesService.updateHeroe(heroe).then(heroe => {
      this.userHasVoted = true;
      this.lastVote = VoteType.DISLIKE;
      this.getHeroesData();
      this.updateNewestHeroeLoadPercentBars();
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

  private updateNewestHeroeLoadPercentBars() {
    if (this.newestHeroe) {
      this.updateHeroeLoadPercentBars(
        this.newestHeroe,
        'newest-hero-likes-percent',
        'newest-hero-dislikes-percent'
      );
    }
  }

  private updateHeroeLoadPercentBars(
    heroe: Heroe,
    likesPercentBarId: string,
    dislikesPercentBarId: string
  ): void {
    this.updateLoadPercentBars(
      likesPercentBarId,
      dislikesPercentBarId,
      heroe.votesDetails.likesPercent,
      heroe.votesDetails.dislikesPercent
    );
  }

  private updateLoadPercentBars(
    likesPercentBarId: string,
    dislikesPercentBarId: string,
    likesPercentBarValue: number,
    dislikesPercentBarValue: number
  ): void {
    const likesPercentBar: HTMLElement | null = document.getElementById(likesPercentBarId);
    const dislikesPercentBar: HTMLElement | null = document.getElementById(dislikesPercentBarId);

    if (likesPercentBar) {
      likesPercentBar.style.width = `${likesPercentBarValue}%`;
    } else {}
    if (dislikesPercentBar) {
      dislikesPercentBar.style.width = `${dislikesPercentBarValue}%`;
    } else {}
  }

}
