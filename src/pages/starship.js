import {inject} from 'aurelia-framework';
import {RetrieveExtraData} from 'services/retrieveData';

@inject(RetrieveExtraData)
export class Users {
  baseUrl = 'http://swapi.co/api/';
  dataSettings = [ //prepare the additional data to be fetched;
    { category : 'pilots', info: 'pilotsinfo' },
    { category : 'films', info: 'filmsinfo', name: 'title' }
  ];

  constructor(retrieveExtraData) {
    this.retrieveExtraData = retrieveExtraData;
  }

  async activate(params) {
    this.starship = await this.retrieveExtraData
      .init(`${this.baseUrl}starships/${params.id}`, this.dataSettings)
  }
}
