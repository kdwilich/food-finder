export interface Params {
  keyword?: string;
  language?: string;
  maxprice?: number;
  minprice?: number;
  opennow?: boolean;
  pagetoken?: string;
  radius: number;
  rankby?: string;
  type: 'bakery' | 'bar' | 'cafe' | 'restaurant' | 'food';
}

export interface NearbySearch {
  html_attributions: any[];
  next_page_token: string;
  results: NearbyResult[];
  status: string;
}

export interface NearbyResult {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: Openinghours;
  photos?: Photo[];
  place_id: string;
  plus_code: Pluscode;
  price_level: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
}

interface Pluscode {
  compound_code: string;
  global_code: string;
}

export interface Photo {
  height: number;
  html_attributions?: string[];
  photo_reference: string;
  width: number;
}

interface Openinghours {
  open_now: boolean;
}

interface Geometry {
  location: Location;
  viewport: Viewport;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Location {
  lat: number;
  lng: number;
}
