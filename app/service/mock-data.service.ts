import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private characters = [
    { id: 1, name: 'Luke Skywalker', description: 'Hero of the Rebellion' },
    { id: 2, name: 'Darth Vader', description: 'Dark Lord of the Sith' },
    { id: 3, name: 'Princess Leia', description: 'Leader of the Rebel Alliance' },
    { id: 4, name: 'Han Solo', description: 'Smuggler and pilot of the Millennium Falcon' },
    { id: 5, name: 'Obi-Wan Kenobi', description: 'Jedi Master and mentor to Luke' },
    { id: 6, name: 'Yoda', description: 'Wise and powerful Jedi Master' },
    { id: 7, name: 'Chewbacca', description: 'Wookiee co-pilot of the Millennium Falcon' },
    { id: 8, name: 'Lando Calrissian', description: 'Administrator of Cloud City' },
    { id: 9, name: 'R2-D2', description: 'Astro-mech droid with important messages' },
    { id: 10, name: 'C-3PO', description: 'Protocol droid fluent in over six million forms of communication' },
    // Add more characters
  ];

  getCharacters(): Observable<any[]> {
    return of(this.characters);
  }

  getCharactersLoader(): Observable<boolean> {
    return timer(1000).pipe(map(() => false));
  }
}
