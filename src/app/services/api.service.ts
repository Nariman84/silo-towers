import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IIndicator } from '../../model/indicator';
import { Observable } from 'rxjs';
  
@Injectable({
    providedIn: 'root'
})
export class ApiService {
  
    constructor(private httpClient: HttpClient) { }

    API_KEY = '0f46a930';
      
    public getData(): Observable<IIndicator[]> {
        return <Observable<IIndicator[]>>this.httpClient.get(`https://my.api.mockaroo.com/indicators.json?key=${this.API_KEY}`);
    }
}