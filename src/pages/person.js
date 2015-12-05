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

  extractInfo(data) {
    // get the planet name for each person
    this.person = data;

    if (data) {
      // get planet name
      if (data.hasOwnProperty('homeworld')) {
        this.http.fetch(data.homeworld)
          .then(response => response.json())
          .then(val => this.person.homeworldname = val.name);
      }

      this.retrieveData(data, 'films', 'filmsinfo', 'title'); // get film names
      this.retrieveData(data, 'species', 'speciesinfo', 'name'); // get specie names
      this.retrieveData(data, 'vehicles', 'vehiclesinfo', 'name'); // get vehicle names
      this.retrieveData(data, 'starships', 'starshipsinfo', 'name'); // get starship names
    }
  }

  retrieveData(data, property, newProperty, oldProperty) {
    if (data.hasOwnProperty(property)) {

      // make extra request to extract the name
      data[property].forEach((link) => {
        this.http.fetch(link)
          .then(response => response.json())
          .then(val => {
            if (typeof this.person[newProperty] === 'undefined') this.person[newProperty] = [];
            this.person[newProperty].push({ name: val[oldProperty], link: link })
          });
      })
    }
  }
}

