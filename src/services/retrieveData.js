import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class RetrieveExtraData {

  constructor(http) {
    this.http = http;
  }

  extractInfo(data, dataSettings) {
    this.data = data;

    if (data && dataSettings) {
      dataSettings.forEach((val) => this.retrieveData(val.category, val.info, val.name, val.isArray) );
      return this.data;
    }
  }

  retrieveData(category, info, name, isArray) {
    if (this.data.hasOwnProperty(category)) {

      let fetchData = (link) => {
        this.http.fetch(link)
          .then(response => response.json())
          .then(val => {
            if (typeof this.data[info] === 'undefined') this.data[info] = [];
            this.data[info].push({ name: val[name], link: link })
          })
      };

      // make extra request to extract the name & the link
      if (isArray) this.data[category].forEach((link) => fetchData(link));
      else fetchData(this.data[category]);
    }
  }
}
