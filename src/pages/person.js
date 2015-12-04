import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = '';
  people = [];
  sortDirection = 1;
  baseUrl = 'http://swapi.co/api/';

  constructor(http) {
    this.http = http;
  }

  activate(params) {
    return this.http.fetch(`${this.baseUrl}people/${params.id}`)
      .then(response => response.json())
      .then(data => this.extractInfo(data));
  }

  updateSortDirection(param) {
    this.sortDirection = (param?param:1);
  }

  extractInfo(data) {
    // get the planet name for each person
    this.person = data;
    this.person.filmnames = [];
    this.person.speciesnames = [];
    this.person.vehiclenames = [];
    this.person.starshipnames = [];

    if (data) {
      // get planet name
      if (data.hasOwnProperty('homeworld')) {
        this.http.fetch(data.homeworld)
          .then(response => response.json())
          .then(val => this.person.homeworldname = val.name);
      }

      this.retrieveData(data, 'films', 'filmnames', 'title'); // get film names
      this.retrieveData(data, 'species', 'speciesnames', 'name'); // get specie names
      this.retrieveData(data, 'vehicles', 'vehiclenames', 'name'); // get vehicle names
      this.retrieveData(data, 'starships', 'starshipnames', 'name'); // get starship names
    }
  }

  retrieveData(data, property, newProperty, oldProperty) {
    if (data.hasOwnProperty(property)) {
      data[property].forEach((val) => {
        this.http.fetch(val)
          .then(response => response.json())
          .then(val => this.person[newProperty].push(val[oldProperty]));
      })
    }
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
