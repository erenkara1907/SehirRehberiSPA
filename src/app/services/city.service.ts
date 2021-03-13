import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { identity, Observable } from 'rxjs';
import { Photo } from '../models/photo';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(
    private httpClient: HttpClient,
    private alertfiyService: AlertifyService,
    private router: Router
  ) {}
  path = 'https://localhost:44381/api/';

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + 'cities');
  }

  getCityById(cityId: any): Observable<City> {
    return this.httpClient.get<City>(this.path + 'cities/detail/?id=' + cityId);
  }

  getPhotosByCity(cityId: number): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(
      this.path + 'cities/photos/?cityId=' + cityId
    );
  }

  add(city: any) {
    this.httpClient.post<{id:string}>(this.path + 'cities/add', city).subscribe((data) => {
      this.alertfiyService.success('Şehir başarıyla eklendi');
      this.router.navigateByUrl('/cityDetail/'+ data['id']);
    });
  }
}
