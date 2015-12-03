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

export class SortValueConverter {
  toView(array, propertyName, direction) {
    let factor = direction === 'ascending' ? 1 : -1;

    return array
      .slice(0)
      .sort((a, b) => {
        return (a[propertyName] - b[propertyName]) * factor
      });
  }
}

export class nameFilterValueConverter {
  toView(people, text) {
      return (text?people.filter(value => value.name.toLowerCase().indexOf(text.toLowerCase()) > -1):people);
  }
}
