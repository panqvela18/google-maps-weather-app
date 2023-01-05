import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {styles} from './mapstyle'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public data: any;
  public temperatures: any;
  public windSpeed: any;
  public region: any;
  public hourly:any
 
  title: string = 'Google Map Project';
  subtitle: string = 'Click on map and get information about weather'; 
  zoom: number = 4;
  center: google.maps.LatLngLiteral = {
    lat: 41.995178646318074,
    lng: 43.97460830211639,
  };
  markerOptions: google.maps.MarkerOptions = {draggable:false}
  markerPositions: google.maps.LatLngLiteral[] = [];
  
  constructor(private httpClient: HttpClient) {}
  
  mapClick(event: google.maps.MapMouseEvent) {
    this.markerPositions = []
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
      this.httpClient
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${this.center.lat}&longitude=${this.center.lng}&hourly=temperature_2m,windspeed_10m&timezone=auto&start_date=2022-12-30&end_date=2022-12-31`
        )
        .subscribe((res) => {
          this.data = res;
          let hours:number []= this.data.hourly.time
          this.hourly  = hours

          let temperature:number[]=this.data.hourly.temperature_2m
          this.temperatures = temperature

          let windspeeds:number []= this.data.hourly.windspeed_10m
          this.windSpeed = windspeeds

          let region:string = this.data.timezone;
          this.region = region;
        });
        this.markerPositions.push(event.latLng.toJSON())
      
    }
  }
}

