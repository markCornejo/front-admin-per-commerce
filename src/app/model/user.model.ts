
export class User {

  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public phone: string,
    public address: string,
    public birthdate: string,
    public genere: string,
    public photo: string,
    // tslint:disable-next-line: variable-name
    public verify_email: number,
    // tslint:disable-next-line: variable-name
    public pc_countries_id: number,
    public token: string,
  ) {}

}
