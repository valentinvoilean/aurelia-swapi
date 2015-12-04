/**
 * profileId Filter
 * extracts the ID number from the person.url
 *
 * e.g. "url": "http://swapi.co/api/people/1/" ==> 1
 *
 * @url = the url given
 * @format = films, species, planets, people, starships, vehicles
 */
export class ProfileIdValueConverter {
  toView(url,format) {
    return (!!url && !!format) ? '#/' + format + '/' + url.split('/').slice(-2, -1)[0] : '';
  }
}
