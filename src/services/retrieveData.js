import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class RetrieveExtraData {
  baseUrl = 'http://swapi.co/api/';

  constructor(http) {
    this.http = http;
  }

  init(url, dataSettings) {
    return this.http.fetch(this.baseUrl + url) // fetch main data
      .then(response => response.json())
      .then(data => {
        this.data = data;

        // fetch data from the object's node
        if (dataSettings) dataSettings.forEach((val) => this.fetchExtraData(val.category, val.info, val.name) );

        return this.data;
      });
  }

  fetchExtraData(category, info, name) {
    if (this.data.hasOwnProperty(category)) {
      [].concat(this.data[category]).forEach((link) => { // little hack to covert string to array
        this.http.fetch(link) // make an extra request to extract the name & the link
          .then(response => response.json())
          .then(val => {
            if (typeof this.data[info] === 'undefined') this.data[info] = []; // build the array
            this.data[info].push({ name: val[(name?name:'name')], link: link })
          })
      });
    }
  }
}
