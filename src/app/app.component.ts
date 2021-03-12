import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Pokedex} from './models/pokedex';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-client';

  pokedex:Pokedex[] = [];
  isLoading = false;

  ngOnInit(){
    this.fetchPokedex();
  }

  constructor(private http: HttpClient){}

  onCreateEntry(postPokemon:Pokedex) {
    // Send Http request
    this.http
      .post<{ name:string }>(
        'https://pokemondb-feebb-default-rtdb.firebaseio.com/pokedex.json',
        postPokemon
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPokedex() {
    this.fetchPokedex();
    console.log("fetching");
  }

  onClearPokedex() {
    // Send Http request
  }

  private fetchPokedex() {
    this.isLoading = true;
    this.http
      .get<{[key: string]: Pokedex}>('https://pokemondb-feebb-default-rtdb.firebaseio.com/pokedex.json')
      .pipe(
        map(responseData => {
          const pokeArray:Pokedex[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              pokeArray.push({ ...responseData[key], id:key});
            }
          }
          return pokeArray;
        })
      )
      .subscribe(pokemon => {
        this.isLoading = false;
        this.pokedex = pokemon;
      });
  }

}
