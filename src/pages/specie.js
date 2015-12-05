import {inject} from 'aurelia-framework';
import {RetrieveExtraData} from 'services/retrieveData';

@inject(RetrieveExtraData)
export class Users {
  baseUrl = 'http://swapi.co/api/';
  dataSettings = [ //prepare the additional data to be fetched;
    {category: 'homeworld', info: 'homeworldinfo'},
    {category: 'people', info: 'peopleinfo'},
    {category: 'films', info: 'filmsinfo', name: 'title'}
  ];

  constructor(retrieveExtraData) {
    this.retrieveExtraData = retrieveExtraData;
  }

  async activate(params) {
    this.specie = await this.retrieveExtraData
      .init(`${this.baseUrl}species/${params.id}`, this.dataSettings);

    console.log(this.specie);
  }
}
