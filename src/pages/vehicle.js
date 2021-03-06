import {inject} from 'aurelia-framework';
import {RetrieveExtraData} from 'services/retrieveData';

@inject(RetrieveExtraData)
export class Users {
  dataSettings = [ //prepare the additional data to be fetched;
    { category : 'pilots', info: 'pilotsinfo' },
    { category : 'films', info: 'filmsinfo', name: 'title' }
  ];

  constructor(retrieveExtraData) {
    this.retrieveExtraData = retrieveExtraData;
  }

  async activate(params) {
    this.vehicle = await this.retrieveExtraData.init(`vehicles/${params.id}`, this.dataSettings)
  }
}
