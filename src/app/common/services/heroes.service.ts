import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroesJSONPath = '/assets/heroes.json';
  heroesLSKey = 'heroes';
  constructor() { }

  async getHeroes(): Promise<any> {
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
}
