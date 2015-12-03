let viewModelPath = '../view-model/';

export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      {route: ['', 'welcome'], name: 'welcome', moduleId: `${viewModelPath}welcome`, nav: true, title: 'Welcome'},
      {route: 'users', name: 'users', moduleId: `${viewModelPath}users`, nav: true, title: 'Github Users'},
      {route: 'child-router', name: 'child-router', moduleId: `${viewModelPath}child-router`, nav: true, title: 'Child Router'}
    ]);

    this.router = router;
  }
}
