import {inject} from 'aurelia-framework';
import {RetrieveExtraData} from 'services/retrieveData';

@inject(RetrieveExtraData)
export class Users {
  dataSettings = [ //prepare the additional data to be fetched;
    { category : 'characters', info: 'charactersinfo' },
    { category : 'planets', info: 'planetsinfo' },
    { category : 'species', info: 'speciesinfo' },
    { category : 'vehicles', info: 'vehiclesinfo' },
    { category : 'starships', info: 'starshipsinfo' }
  ];

  constructor(retrieveExtraData) {
    this.retrieveExtraData = retrieveExtraData;
  }

  async activate(params) {
    this.movie = await this.retrieveExtraData.init(`films/${params.id}`, this.dataSettings)
  }
}
