export interface ResponseLoginPeruCommerce {
  ok: boolean;
  data: Data;
  message: string;
}

interface Data {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  birthdate: string;
  genere: string;
  photo: string;
  verify_email: number;
  pc_countries_id: number;
  token: string;
}
