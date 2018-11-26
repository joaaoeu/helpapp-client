import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestCardsService {

  private _apiUrl = 'http://localhost:5001/api';
  
  private _requestCardsUrl = this._apiUrl + '/requestCards';
  
  constructor(private http: HttpClient) { }
  
  getRequestCards() {
    return this.http.get<any>(this._requestCardsUrl);
  }
  
  createNewRequest(request) {
    return this.http.post<any>(this._requestCardsUrl, request);
  }
  
  saveRequest(request) {
    return this.http.put<any>(this._requestCardsUrl, request);
  }
  
  deleteRequest(request) {
    // @ts-ignore
    return this.http.delete<any>(this._requestCardsUrl, new RequestOptions({
       body: request
    }));
  }
}