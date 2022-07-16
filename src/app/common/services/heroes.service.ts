import { Injectable } from '@angular/core';
import { Heroe } from '@app/common/types/interfaces/heroe';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroesJSONPath = '/assets/heroes.json';
  heroesLSKey = 'heroes';
  constructor() { }

  async getHeroes(): Promise<Heroe[] | null> {
    try {
      if (!localStorage.getItem(this.heroesLSKey)) {
        await fetch(this.heroesJSONPath).then(res => res.json())
          .then(heroes => localStorage.setItem(this.heroesLSKey, JSON.stringify(heroes)));
      }
  
      let heroes = localStorage.getItem(this.heroesLSKey);
      if (heroes) {
        return JSON.parse(heroes);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getHeroeById(id: number): Promise<Heroe | null> {
    try {
      let heroes: Heroe[] | null = await this.getHeroes();
      if (heroes) {
        let foundHeroe = heroes.find(heroe => heroe.id === id);
        if (foundHeroe) {
          return foundHeroe;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getHeroeByIdNotIn(ids: number[]): Promise<Heroe[] | null> {
    try {
      let heroes: Heroe[] | null = await this.getHeroes();
      if (heroes) {
        let foundHeroes = heroes.filter(heroe => !ids.includes(heroe.id));
        return foundHeroes;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
