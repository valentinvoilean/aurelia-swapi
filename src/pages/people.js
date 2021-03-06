import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'Star Wars People';
  people = [];
  sortDirection = 1;
  baseUrl = 'http://swapi.co/api/people/?page=';

  constructor(http) {
    this.http = http;
  }

  activate(params) {
    return this.fetchData(this.baseUrl + (params.id ? params.id: 1));
  }

  changePage(param) {
    if (param === 1 && this.nextPage) this.fetchData(this.nextPage);
    else if (this.prevPage) this.fetchData(this.prevPage);
  }

  fetchData(url) {
    this.http.fetch(url)
      .then(response => response.json())
      .then(data => {
          this.prevPage = data.previous;
          this.nextPage = data.next;
          this.extractInfo(data.results);
        }
      );
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
