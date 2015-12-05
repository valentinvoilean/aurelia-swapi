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
    return this.http.fetch(`${this.baseUrl}planets/${params.id}`)
      .then(response => response.json())
      .then(data => this.extractInfo(data));
  }

  extractInfo(data) {
    // get the planet name for each person
    this.planet = data;

    //prepare the data to be fetched
    let extraInfo = [
      { category : 'residents', info: 'residentsinfo', name: 'name', isArray: true },
      { category : 'films', info: 'filmsinfo', name: 'title', isArray: true }
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
            if (typeof this.planet[info] === 'undefined') this.planet[info] = [];
            this.planet[info].push({ name: val[name], link: link })
          });
      };

      // make extra request to extract the name & the link
      if (isArray) data[category].forEach((link) => fetchData(link));
      else fetchData(data[category]);
    }
  }
}
