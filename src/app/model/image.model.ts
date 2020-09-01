
export class Image {

  ok: any;
  data: any;

  constructor(
    public id: number,
    // tslint:disable-next-line: variable-name
    public pc_sites_id: number,
    public name: string,
    public type: string,
    public status: number
  ){}

}
