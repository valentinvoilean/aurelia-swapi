import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  baseUrl = 'http://swapi.co/api/';

  constructor(http) {
    this.http = http;
  }

  activate(params) {
    return this.http.fetch(`${this.baseUrl}films/${params.id}`)
      .then(response => response.json())
      .then(data => this.extractInfo(data));
  }

  extractInfo(data) {
    // get the planet name for each person
    this.movie = data;

    //prepare the data to be fetched
    let extraInfo = [
      { category : 'characters', info: 'charactersinfo', name: 'name', isArray: true },
      { category : 'planets', info: 'planetsinfo', name: 'name', isArray: true },
      { category : 'species', info: 'speciesinfo', name: 'name', isArray: true },
      { category : 'vehicles', info: 'vehiclesinfo', name: 'name', isArray: true },
      { category : 'starships', info: 'starshipsinfo', name: 'name', isArray: true }
    ];

    if (data) {
      extraInfo.forEach((val) => this.retrieveData(data, val.category, val.info, val.name, val.isArray) )
    }
  }

  retrieveData(data, category, info, name, isArray) {
    if (data.hasOwnProperty(category)) {

      let fetchData = (link) => {
        this.http.fetch(link)
          .then(response => response.json())
          .then(val => {
            if (typeof this.movie[info] === 'undefined') this.movie[info] = [];
            this.movie[info].push({ name: val[name], link: link })
          });
      };

      // make extra request to extract the name & the link
      if (isArray) data[category].forEach((link) => fetchData(link));
      else fetchData(data[category]);
    }
  }
}

