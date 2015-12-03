import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'Star Wars People';
  people = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://swapi.co/api/');
    });

    this.http = http;
  }

  activate() {
    return this.http.fetch('people')
      .then(response => response.json())
      .then(data => this.people = data.results);
  }
}
