export interface PlaceSearch {
  meta: Meta;
  response: Response;
}

export interface Response {
  venues: Venue[];
  confident: boolean;
}

export interface Venue {
  id: string;
  name: string;
  location: Location;
  categories: Category[];
  delivery?: Delivery;
  referralId: string;
  hasPerk: boolean;
  venuePage?: VenuePage;
}

interface VenuePage {
  id: string;
}

interface Delivery {
  id: string;
  url: string;
  provider: Provider;
}

interface Provider {
  name: string;
  icon: Icon2;
}

interface Icon2 {
  prefix: string;
  sizes: number[];
  name: string;
}

interface Category {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: Icon;
  primary: boolean;
}

interface Icon {
  prefix: string;
  suffix: string;
}

interface Location {
  address?: string;
  lat: number;
  lng: number;
  labeledLatLngs: LabeledLatLng[];
  distance: number;
  postalCode: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
  crossStreet?: string;
}

interface LabeledLatLng {
  label: string;
  lat: number;
  lng: number;
}

interface Meta {
  code: number;
  requestId: string;
}
