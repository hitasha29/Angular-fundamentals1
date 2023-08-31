import { Component, OnDestroy } from '@angular/core';
import { MockDataService } from './service/mock-data.service'; // Import your MockDataService
import { BehaviorSubject, Observable, of, Subject,combineLatest } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil } from 'rxjs/operators';


interface Character {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  searchResults: Character[] = [];
  isLoading: boolean = false;
  searchQuery: string = '';

  private characters: Character[] = [
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

  private searchTermByCharacters = new BehaviorSubject<string>('');

  isLoadingCharacters$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  private unsubscribe$ = new Subject<void>();

  constructor(private mockDataService: MockDataService) {
    this.searchTermByCharacters.pipe(
      filter(term => term.length >= 3),
      debounceTime(300),
      switchMap(term => this.getCharacters(term))
    ).subscribe(characters => {
      this.searchResults = characters;
    });

    this.isLoadingCharacters$ = this.mockDataService.getCharactersLoader();
    
    this.isLoading$ = combineLatest([this.isLoadingCharacters$]).pipe(
      map(([charactersLoader]) => charactersLoader)
    );
  }

  onSearchInputChange(value: string) {
    this.searchTermByCharacters.next(value);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  private getCharacters(searchTerm: string): Observable<Character[]> {
    return of(this.characters).pipe(
      map(characters => {
        if (searchTerm) {
          return characters.filter(
            character =>
              character.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return characters;
      })
    );
  }
}
