import {inject} from 'aurelia-framework';
import {RetrieveExtraData} from 'services/retrieveData';

@inject(RetrieveExtraData)
export class Users {
  baseUrl = 'http://swapi.co/api/';
  dataSettings = [ //prepare the additional data to be fetched;
    { category : 'homeworld', info: 'homeworldinfo' },
    { category : 'films', info: 'filmsinfo', name: 'title' },
    { category : 'species', info: 'speciesinfo' },
    { category : 'vehicles', info: 'vehiclesinfo' },
    { category : 'starships', info: 'starshipsinfo' }
  ];

  constructor(retrieveExtraData) {
    this.retrieveExtraData = retrieveExtraData;
  }

  async activate(params) {
    this.person = await this.retrieveExtraData
      .init(`${this.baseUrl}people/${params.id}`, this.dataSettings)
  }
}
