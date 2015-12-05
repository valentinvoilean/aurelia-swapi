import {inject} from 'aurelia-framework';
import {RetrieveExtraData} from 'services/retrieveData';

@inject(RetrieveExtraData)
export class Users {
  baseUrl = 'http://swapi.co/api/';
  dataSettings = [ //prepare the additional data to be fetched;
    { category : 'residents', info: 'residentsinfo'},
    { category : 'films', info: 'filmsinfo', name: 'title' }
  ];

  constructor(retrieveExtraData) {
    this.retrieveExtraData = retrieveExtraData;
  }

  async activate(params) {
    this.planet = await this.retrieveExtraData.init(`planets/${params.id}`, this.dataSettings)
  }
}
