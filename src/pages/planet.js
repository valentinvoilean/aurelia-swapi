import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'Star Wars People';
  people = [];
  sortDirection = 1;
  baseUrl = 'http://swapi.co/api/';

  constructor(http) {
    this.http = http;
  }

  activate() {
    return this.http.fetch(`${this.baseUrl}people`)
      .then(response => response.json())
      .then(data => this.extractInfo(data.results));
  }

  updateSortDirection(param) {
    this.sortDirection = (param?param:1);
  }

  extractInfo(data) {
    // get the planet name for each person
    data.forEach((val) => {
        if (val && val.hasOwnProperty('homeworld'))
          this.http.fetch(val.homeworld).then(response => response.json()).then(data => val.homeworldname = data.name);
      }
    );

    this.people = data;
  }
}

/**
 * Sort Value Converter
 */
export class SortValueConverter {
  toView(people, direction) {
    return people
      .slice(0)
      .sort((a, b) =>  (a.name > b.name) ? direction  : ((b.name > a.name) ? -direction : 0));
  }
}

/**
 * Filter Value Converter
 */
export class FilterValueConverter {
  toView(people, text) {
    return (text ? people.filter(value => value.name.toLowerCase().indexOf(text.toLowerCase()) > -1) : people);
  }
}
