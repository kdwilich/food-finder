import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NearbySearch, NearbyResult, Photo } from 'src/app/interfaces/g-nearbysearch';
import { environment } from 'src/environments/environment';
import { map, take, tap } from 'rxjs/operators';
import { PlaceService } from './services/place.service';
import { Venue } from './interfaces/fsq-search';
import { Recommendation } from './interfaces/fsq-recommendations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  gPlaceEndpoint = 'https://maps.googleapis.com/maps/api/place';
  apikey = 'AIzaSyCJMU1Bg76udCig78ngnODZP2fusbILAOQ'; // TODO: make ENV variable

  useMockData: boolean = true;
  lat;
  lng;

  miles: number = 2;
  query: string = '';
  prices: string = '1,2,3,4';
  types = ['food', 'breakfast', 'brunch', 'lunch', 'coffee', 'dinner', 'dessert', 'drinks'];
  selectedType = 'food';
  sortByDistance: boolean = true;
  openNow: boolean = true;

  places: NearbyResult[] = [];
  nextPageToken: string = '';
  pic;

  venues: Venue[] = [];
  recommendations: Recommendation[] = [];
  page: number = 0;
  pageLimit: number = 50;
  totalResults: number = 0;

  constructor(private http: HttpClient, private placeService: PlaceService) {
    if (!environment.production) {
      const proxyUrl = 'https://cors-anywhere-kw.herokuapp.com/';
      this.gPlaceEndpoint = proxyUrl + this.gPlaceEndpoint;
    }
  }

  async ngOnInit() {
    // this.getLocation();
    this.getNewRecommendations();
  console.log(this.recommendations);
  }

  milesToMeters = (miles) => miles * 1609;

  getNewRecommendations() {
    this.recommendations = [];
    this.page = 0;
    this.getRecommendations();
  }

  async getRecommendations() {
    const { results, totalResults } = this.useMockData
    ? await this.placeService.getMockRecommendations(this.page)
    : await this.placeService.getRecommendations(
      '36.317,-94.1568',
      this.selectedType,
      this.query,
      this.milesToMeters(this.miles),
      this.prices,
      this.openNow,
      this.sortByDistance,
      this.page
      );

    this.totalResults = totalResults;
    this.page += this.pageLimit;
    this.recommendations.push(...results);
  }

}
