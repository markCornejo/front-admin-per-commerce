export interface ResponseSiteInfo {
  ok: boolean;
  data: Data;
  message: string;
}

interface Data {
  id: number;
  name: string;
  description: string;
  logo: string;
  subdomain: string;
  domain: string;
  sales_packages_id: number;
  sites_lg: Siteslg[];
  sites_locations: Siteslocation[];
  sites_categories: any[];
  sites_subcategories: any[];
}

interface Siteslocation {
  id: number;
  main: number;
  lat: string;
  lng: string;
  address: string;
  phone: string;
}

interface Siteslg {
  name: string;
  description: string;
  language: string;
}
