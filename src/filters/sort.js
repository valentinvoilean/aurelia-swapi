/**
 * Sort Value Converter
 */
export class SortValueConverter {
  toView(people, direction) {
    return people
      .slice(0)
      .sort((a, b) =>  (a.name > b.name) ? direction  : ((b.name > a.name) ? -direction : 0));
  }
}
