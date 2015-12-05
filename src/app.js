import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

let pagesPath = './pages';

@inject(Router)
export class App {
  constructor(router) {
    this.router = router;

    this.router.configure(config => {
      config.title = 'SWAPI';
      config.map([
        {route: ['', 'people'], name: 'people', moduleId: `${pagesPath}/people`, nav: true, title: 'People'},
        {route: 'people/:id', name: 'people', moduleId: `${pagesPath}/people`, title: 'People'},
        {route: 'person/:id', name: 'person', moduleId: `${pagesPath}/person`, nav: false, title: 'Person'},
        {route: 'movies', name: 'movies', moduleId: `${pagesPath}/movies`, nav: true, title: 'Movies'},
        {route: 'movie/:id', name: 'movie', moduleId: `${pagesPath}/movie`, nav: false, title: 'Movie'},
        {route: 'planets', name: 'planets', moduleId: `${pagesPath}/planets`, nav: true, title: 'Planets'},
        {route: 'planet/:id', name: 'planet', moduleId: `${pagesPath}/planet`, nav: false, title: 'Planet'},
        {route: 'species', name: 'species', moduleId: `${pagesPath}/species`, nav: true, title: 'Species'},
        {route: 'specie/:id', name: 'specie', moduleId: `${pagesPath}/specie`, nav: false, title: 'Specie'},
        {route: 'vehicles', name: 'vehicles', moduleId: `${pagesPath}/vehicles`, nav: true, title: 'Vehicles'},
        {route: 'vehicle/:id', name: 'vehicle', moduleId: `${pagesPath}/vehicle`, nav: false, title: 'Vehicle'},
        {route: 'starships', name: 'starships', moduleId: `${pagesPath}/starships`, nav: true, title: 'Starships'},
        {route: 'starship/:id', name: 'starship', moduleId: `${pagesPath}/starship`, nav: false, title: 'Starship'}
      ]);
    });
  }
}
