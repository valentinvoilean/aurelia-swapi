import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'Species';
  species = [];
  baseUrl = 'http://swapi.co/api/';

  constructor(http) {
    this.http = http;
  }

  activate() {
    return this.http.fetch(`${this.baseUrl}species`)
      .then(response => response.json())
      .then(data => this.species = data.results);
  }
}
