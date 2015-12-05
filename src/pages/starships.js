import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'Starships';
  starships = [];
  baseUrl = 'http://swapi.co/api/';

  constructor(http) {
    this.http = http;
  }

  activate() {
    return this.http.fetch(`${this.baseUrl}starships`)
      .then(response => response.json())
      .then(data => this.starships = data.results);
  }
}
