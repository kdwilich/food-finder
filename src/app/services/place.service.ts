import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceSearch, Venue } from 'src/app/interfaces/fsq-search';
import { PlaceExplore } from 'src/app/interfaces/fsq-explore';
import { Group, PlaceRecommendation, Recommendation } from 'src/app/interfaces/fsq-recommendations';


@Injectable({
  providedIn: 'root'
})

export class PlaceService {
  fsqEndpoint = 'https://api.foursquare.com/v2';
  clientId = 'UHPOME24V2CZIQ1JHO1JKE411XFDBLRFOI5UT25LJEMIF323';
  clientSecret = 'OC3XHPY2Q2V3MBNBJHHZ551WWGYHROQRHXO0FFV4G1TJWX40';
  v = '20213108';
  categoryId = '4d4b7105d754a06374d81259';

  venues: Venue[] = [];

  constructor(private http: HttpClient) { }

  getPlaces(): Promise<Venue[]> {
    let params = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      v: this.v,
      ll: '36.317,-94.1568',
      radius: 3000,
      limit: 50,
      section: 'food',
      categoryId: this.categoryId
    };

    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return this.http.get<PlaceSearch>(this.fsqEndpoint + '/venues/search?' + queryString)
      .toPromise()
      .then(res => res.response.venues);
  }

  getRecommendations(
    ll,
    intent,
    query,
    radius,
    prices,
    openNow,
    sortByDistance,
    page
  ): Promise<Group> {
    let params = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      v: this.v,
      ll,
      limit: 50,
      offset: page,
      intent,
      query,
      radius,
      prices,
      openNow,
      sortByDistance
    };

    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return this.http.get<PlaceRecommendation>(this.fsqEndpoint + '/search/recommendations?' + queryString)
      .toPromise()
      .then(res => res.response.group);
  }

  getMockRecommendations(page): Promise<Group> {
    return this.http.get<PlaceRecommendation>('/assets/mockdata/fsq-recommendations-lg.json')
      .toPromise()
      .then(res => {
        const results = res.response.group.results.slice(page, page + 50);

        return { results, totalResults: res.response.group.totalResults }
      });
  }
}
