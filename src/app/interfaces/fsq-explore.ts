export interface PlaceExplore {
  meta: Meta;
  response: Response;
}

interface Response {
  suggestedFilters: SuggestedFilters;
  headerLocation: string;
  headerFullLocation: string;
  headerLocationGranularity: string;
  query: string;
  totalResults: number;
  suggestedBounds: SuggestedBounds;
  groups: Group[];
}

interface Group {
  type: string;
  name: string;
  items: Item2[];
}

interface Item2 {
  reasons: Reasons;
  venue: Venue;
  referralId: string;
}

interface Venue {
  id: string;
  name: string;
  location: Location;
  categories: Category[];
  photos: Photos;
  delivery?: Delivery;
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

interface Photos {
  count: number;
  groups: any[];
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
  labeledLatLngs?: LabeledLatLng[];
  distance: number;
  postalCode?: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
  neighborhood?: string;
  crossStreet?: string;
}

interface LabeledLatLng {
  label: string;
  lat: number;
  lng: number;
}

interface Reasons {
  count: number;
  items: Item[];
}

interface Item {
  summary: string;
  type: string;
  reasonName: string;
}

interface SuggestedBounds {
  ne: Ne;
  sw: Ne;
}

interface Ne {
  lat: number;
  lng: number;
}

interface SuggestedFilters {
  header: string;
  filters: Filter[];
}

interface Filter {
  name: string;
  key: string;
}

interface Meta {
  code: number;
  requestId: string;
}
