import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'Star Wars People';
  people = [];
  sortDirection = 1;

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

  updateSortDirection(param) {
    this.sortDirection = (param?param:1);
  }
}

export class SortValueConverter {
  toView(array, direction) {
    return array
      .slice(0)
      .sort((a, b) =>  (a.name > b.name) ? direction  : ((b.name > a.name) ? -direction : 0));
  }
}

export class FilterValueConverter {
  toView(people, text) {
    return (text ? people.filter(value => value.name.toLowerCase().indexOf(text.toLowerCase()) > -1) : people);
  }
}
