import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private _apiUrl = 'http://localhost:5001/api';
  
  private _membersUrl = this._apiUrl + '/members';
  
  constructor(private http: HttpClient) { }
  
  getMembers() {
    return this.http.get<any>(this._membersUrl);
  }
  
  createNewMember(member) {
    return this.http.post<any>(this._membersUrl, member);
  }
  
  saveMember(member) {
    return this.http.put<any>(this._membersUrl, member);
  }
  
  deleteMember(member) {
    // @ts-ignore
    return this.http.delete<any>(this._membersUrl, new RequestOptions({
       body: member
    }));
  }
}