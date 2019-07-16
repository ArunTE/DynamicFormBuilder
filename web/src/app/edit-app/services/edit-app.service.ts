import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseUrl = 'http://localhost:3000/api/v1';

@Injectable({providedIn: 'root'})
export class Service {
  private url = `${baseUrl}/generate`;
  constructor(private http: HttpClient) {}


  create(body):Observable<any> {
    return this.http.post<any>(this.url, body, httpOptions);
  }

}
