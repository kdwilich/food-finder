import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NearbySearch, NearbyResult, Photo } from 'src/app/interfaces/g-nearbysearch';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
  miles: number = 5;
  keyword: string = '';
  minprice: string = '0';
  maxprice: string = '4'
  types = ['bakery', 'bar', 'cafe', 'restaurant', 'food'];
  selectedType: 'bakery' | 'bar' | 'cafe' | 'restaurant' | 'food' = 'restaurant';
  rankby: 'prominence' | 'distance' = 'prominence';

  places: NearbyResult[] = [];
  nextPageToken: string = '';
  pic;
  constructor(private http: HttpClient) {
    if (!environment.production) {
      const proxyUrl = 'https://cors-anywhere-kw.herokuapp.com/';
      this.gPlaceEndpoint = proxyUrl + this.gPlaceEndpoint;
    }
  }

  ngOnInit() {
    this.getLocation();

    if (this.useMockData) {
      this.getPlaces();
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        console.log('lat: '+ this.lat);
        console.log('lng: '+ this.lng);
      });
    } else { // some default geo location
      // TODO: if location isn't allowed, make them enter a zipcode
      this.lat = 40.68919;
      this.lng = -73.992378;
      console.log("No support for geolocation, set to default")
    }
  }

  milesToMeters = (miles) => miles * 1609;

  getPlaces() {
    const params = [
      `location=${this.lat},${this.lng}`,
      'radius=' + this.milesToMeters(this.miles),
      'type=' + this.selectedType,
      'maxprice=' + this.maxprice,
      'minprice=' + this.minprice,
      'rankby=' + this.rankby,
      'key=' + this.apikey
    ];
    if (this.keyword !== '') params.push('keyword=' + this.keyword);
    const gNearbySearch = this.gPlaceEndpoint + '/nearbysearch/json?' + params.join('&');
    const gMockData = '/assets/mockdata/g-nearbysearch-20.json';

    this.http.get<NearbySearch>(this.useMockData ? gMockData : gNearbySearch)
      .subscribe((nearbySearch: NearbySearch) => {
        console.log(nearbySearch)
        this.places = nearbySearch.results;
        this.nextPageToken = nearbySearch.next_page_token || '';

        // if (this.places[0].photos !== undefined && this.places[0].photos.length > 0) {
        //   this.getPlacePhoto(this.places[0].photos[0]);
        // }
      });
  }

  getNextPage() {
    const params = [
      'pagetoken=' + this.nextPageToken,
      'key=' + this.apikey
    ];
    const gNearbySearch = this.gPlaceEndpoint + '/nearbysearch/json?' + params.join('&');

    this.http.get<NearbySearch>(gNearbySearch)
      .subscribe((nearbySearch: NearbySearch) => {
        console.log(nearbySearch)
        this.places = nearbySearch.results;
        this.nextPageToken = nearbySearch.next_page_token || '';
      });
  }

  // TODO: figure out if pics are necessary. This is a more expensive request
  // getPlacePhoto(photo: Photo) {

  //   const params = [
  //     'photo_reference=' + photo.photo_reference,
  //     '&maxwidth=400',
  //     'key=' + this.apikey
  //   ].join('&')

  //   this.http.get(this.gPlaceEndpoint + '/photo?' + params)
  //     .subscribe(res => this.pic = res)
  // }

}
