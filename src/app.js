import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

let pagesPath = './pages';

@inject(Router, HttpClient)
export class App {
  constructor(router, client) {
    this.router = router;
    this.client = client;

    this.router.configure(config => {
      config.title = 'SWAPI';
      config.map([
        {route: ['', 'people'], name: 'people', moduleId: `${pagesPath}/people`, nav: true, title: 'People'}

        /*{route: ['', 'contacts'], moduleId: './contacts', nav: true, title: 'Contacts'},
        {route: 'contacts/!*id', moduleId: './edit', title: 'Edit Contact'},
        {route: 'insert', moduleId: './insert', title: 'Insert Contact'}*/
      ]);
    });

    this.client.configure(x => {
      x.withBaseUrl('http://swapi.co/api/');
      x.withHeader('accept', 'application/json')
    });

  }
}
