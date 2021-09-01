export interface PlaceRecommendation {
  meta: Meta;
  response: Response;
}

export interface Response {
  group: Group;
  context: Context;
}

export interface Context {
  searchLocationNearYou: boolean;
  searchLocationMapBounds: boolean;
  searchLocationType: string;
  currentLocation: CurrentLocation;
  boundsSummaryRadius: number;
  relatedNeighborhoods: any[];
  geoParams: GeoParams;
  geoBounds: GeoBounds;
}

interface GeoBounds {
  circle: Circle;
}

interface Circle {
  center: Center;
  radius: number;
}

interface GeoParams {
  ll: string;
  radius: string;
}

interface CurrentLocation {
  what: string;
  where: string;
  feature: Feature;
  parents: any[];
}

interface Feature {
  cc: string;
  name: string;
  displayName: string;
  woeType: number;
  slug: string;
  id: string;
  longId: string;
  geometry: Geometry;
}

interface Geometry {
  center: Center;
  bounds: Bounds;
}

interface Bounds {
  ne: Center;
  sw: Center;
}

interface Center {
  lat: number;
  lng: number;
}

export interface Group {
  results: Recommendation[];
  totalResults: number;
}

export interface Recommendation {
  displayType: string;
  venue: Venue;
  id: string;
  photo?: Photo;
  snippets: Snippets;
}

interface Snippets {
  count: number;
  items: Item[];
}

interface Item {
  detail?: Detail;
}

interface Detail {
  type: string;
  object: Object;
}

interface Object {
  id: string;
  createdAt: number;
  text: string;
  type: string;
  canonicalUrl: string;
  logView: boolean;
  agreeCount: number;
  disagreeCount: number;
  todo: Todo;
  user: User;
  likes?: Likes;
  url?: string;
}

interface Likes {
  count: number;
  groups: any[];
  summary: string;
}

interface User {
  firstName: string;
  lastName?: string;
  countryCode?: string;
  address?: string;
  city?: string;
  state?: string;
}

interface Todo {
  count: number;
}

interface Photo {
  id: string;
  createdAt: number;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  visibility: string;
}

interface Venue {
  id: string;
  name: string;
  location: Location;
  categories: Category[];
  dislike: boolean;
  ok: boolean;
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

interface Meta {
  code: number;
  requestId: string;
}
