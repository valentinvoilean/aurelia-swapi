import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RetrieveExtraData} from 'services/retrieveData';
import 'fetch';

@inject(HttpClient, RetrieveExtraData)
export class Users {
  baseUrl = 'http://swapi.co/api/';
  dataSettings = [ //prepare the additional data to be fetched;
    { category : 'pilots', info: 'pilotsinfo', name: 'name', isArray: true },
    { category : 'films', info: 'filmsinfo', name: 'title', isArray: true }
  ];

  constructor(http , retrieveExtraData) {
    this.http = http;
    this.retrieveExtraData = retrieveExtraData;
  }

  async activate(params) {
    this.vehicle = await this.http.fetch(`${this.baseUrl}vehicles/${params.id}`)
      .then(response => response.json())
      .then(data => {
        return this.retrieveExtraData.extractInfo(data, this.dataSettings);
      });
  }
}
