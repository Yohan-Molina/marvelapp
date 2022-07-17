import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

// Own
// Types
import { Heroe } from '@app/common/types/interfaces/heroe';
// Utils
import { updateHeroeLoadPercentBars } from '@app/common/utils/heroes';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.sass']
})
export class HeroeCardComponent implements OnInit, AfterViewInit {
  @Input("heroe") heroe: Heroe | undefined;
  constructor() { }

  ngOnInit(): void {
    this.updateOlderHeroeLoadPercentBars();
  }

  ngAfterViewInit(): void {
    if (this.heroe) {
      updateHeroeLoadPercentBars(this.heroe);
    }
  }

  updateOlderHeroeLoadPercentBars(){
    if (this.heroe) {
      this.updateHeroeLoadPercentBars(
        this.heroe,
        'older-hero-likes-percent',
        'older-hero-dislikes-percent'
      );
    }
    return true;
  }

  private updateHeroeLoadPercentBars(
    heroe: Heroe,
    likesPercentBarId: string,
    dislikesPercentBarId: string
  ): boolean {
    this.updateLoadPercentBars(
      likesPercentBarId,
      dislikesPercentBarId,
      heroe.votesDetails.likesPercent,
      heroe.votesDetails.dislikesPercent
    );
    return true;
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
