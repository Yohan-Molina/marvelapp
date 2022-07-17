// Own
// Types
import { Heroe } from "../types/interfaces/heroe";

export function updateHeroeLoadPercentBars(
    heroe: Heroe
): boolean {
    updateLoadPercentBars(
        `hero-likes-percent-${heroe.id}`,
        `hero-dislikes-percent-${heroe.id}`,
        heroe.votesDetails.likesPercent,
        heroe.votesDetails.dislikesPercent
    );
    return true;
}

function updateLoadPercentBars(
    likesPercentBarId: string,
    dislikesPercentBarId: string,
    likesPercentBarValue: number,
    dislikesPercentBarValue: number
): void {
    const likesPercentBar: HTMLElement | null = document.getElementById(likesPercentBarId);
    const dislikesPercentBar: HTMLElement | null = document.getElementById(dislikesPercentBarId);

    if (likesPercentBar) {
        likesPercentBar.style.width = `${likesPercentBarValue}%`;
    } else { }
    if (dislikesPercentBar) {
        dislikesPercentBar.style.width = `${dislikesPercentBarValue}%`;
    } else { }
}
