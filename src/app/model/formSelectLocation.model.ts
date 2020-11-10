
export class FormSelectLocation {

  forEach(obj: any, arg1: (val: any, key: any) => void) {
    throw new Error("Method not implemented.");
  }
  countries: DataLocation;
  states: DataLocation;
  cities: DataLocation;
  districs: DataLocation;

  constructor() {
    this.countries = new DataLocation();
    this.states = new DataLocation();
    this.cities = new DataLocation();
    this.districs = new DataLocation();
  }

}

export class DataLocation {
  // tslint:disable-next-line: ban-types
  id: Number;
  // tslint:disable-next-line: ban-types
  name: String;

  constructor() {
    this.id = null;
    this.name = '';
  }
}
