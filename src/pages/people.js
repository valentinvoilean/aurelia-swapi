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

export class nameFilterValueConverter {
  toView(people, text, sortDirection) {
    let finalArray;

    // filter
    finalArray = (text ? people.filter(value => value.name.toLowerCase().indexOf(text.toLowerCase()) > -1) : people);

    // sort
    finalArray.sort((a,b) => (a.name > b.name) ? 1 * sortDirection  : ((b.name > a.name) ? -1 * sortDirection : 0) );

    return finalArray;
  }
}
