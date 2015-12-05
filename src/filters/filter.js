/**
 * Filter Value Converter
 */
export class FilterValueConverter {
  toView(people, text) {
    return (text ? people.filter(value => value.name.toLowerCase().indexOf(text.toLowerCase()) > -1) : people);
  }
}
