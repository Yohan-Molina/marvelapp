import { Injectable } from '@angular/core';

// Own
// Types
import { Heroe } from '@app/common/types/interfaces/heroe';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroesJSONPath = '/assets/heroes.json';
  heroesLSKey = 'heroes';
  constructor() { }

  async getHeroes(): Promise<Heroe[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!localStorage.getItem(this.heroesLSKey)) {
          await fetch(this.heroesJSONPath).then(res => res.json())
            .then(heroes => this.updateHeroes(heroes));
        }
    
        let heroes = localStorage.getItem(this.heroesLSKey);
        if (heroes) {
          let parsedHeroes = JSON.parse(heroes);
          parsedHeroes.forEach((heroe: Heroe) => {
            Object.defineProperty(heroe, 'votesDetails', {
              get: function() {
                let totalVotes = this.likes + this.dislikes;
                let likesPercent: number = (this.likes * 100) / totalVotes;
                let dislikesPercent: number = (this.dislikes * 100) / totalVotes;
                return {
                  likesPercent: Math.round(likesPercent),
                  dislikesPercent: Math.round(dislikesPercent)
                };
              }
            });
          });
          resolve(parsedHeroes);
        } else {
          reject();
        }
      } catch (error) {
        console.log(error);
        reject();
      }
    })
  }

  async getHeroeById(id: number): Promise<Heroe> {
    return new Promise(async (resolve, reject) => {
      try {
        let heroes: Heroe[] = await this.getHeroes();
        let foundHeroe = heroes.find(heroe => heroe.id === id);
        if (foundHeroe) {
          resolve(foundHeroe);
        } else {
          reject();
        }
      } catch (error) {
        console.log(error);
        reject();
      }
    })
  }

  async getHeroeByIdNotIn(ids: number[]): Promise<Heroe[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let heroes: Heroe[] = await this.getHeroes();
        let foundHeroes = heroes.filter(heroe => !ids.includes(heroe.id));
        resolve(foundHeroes);
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  }

  async updateHeroe(heroe: Heroe): Promise<Heroe> {
    return new Promise(async (resolve, reject) => {
      try {
        let heroes: Heroe[]= await this.getHeroes();
        let foundHeroe = heroes.find(h => h.id === heroe.id);
          if (foundHeroe) {
            Object.assign(foundHeroe, heroe);
            this.updateHeroes(heroes);
            resolve(foundHeroe);
          } else {
            reject('No se pudó actualizar el heroe');
          }
      } catch (error) {
        console.log(error);
        reject('No se pudó actualizar el heroe');
      }
    });
  }

  private updateHeroes(heroes: Heroe[]): void {
    localStorage.setItem(this.heroesLSKey, JSON.stringify(heroes));
  }
}
