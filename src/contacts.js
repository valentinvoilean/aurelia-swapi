import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Contact {
  searchEntry = '';
  contacts = [];
  contactId = '';
  contact = '';
  currentPage = 1;
  textShowAll = 'Show All';

  constructor(http) {
    this.http = http;
  }

  updateContacts() {
    return this.http.createRequest("/people/?page=" + this.currentPage)
      .asGet().send().then(response => {
        this.contacts = response.content.results;
        console.log(this.contacts);
      });
  }

  get canSearch() {
    return (this.searchEntry != '' ? true : false);
  }

  activate() {
    return this.updateContacts();
  }

  displayAllContacts() {
    this.searchEntry = '';
    this.activate();
  }
}
