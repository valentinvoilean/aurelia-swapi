import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'Vehicles';
  vehicles = [];
  baseUrl = 'http://swapi.co/api/';

  constructor(http) {
    this.http = http;
  }

  activate() {
    return this.http.fetch(`${this.baseUrl}vehicles`)
      .then(response => response.json())
      .then(data => this.vehicles = data.results);
  }
}
