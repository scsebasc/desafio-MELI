import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetItemDescriptionResponse, GetItemResponse } from '../interfaces/items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient, private router: Router) { }

  searchItems(query: string): Observable<GetItemResponse> {
    const url = environment.API_URL + 'api/items';
    const headers = new HttpHeaders({
      'x-authorization': sessionStorage.getItem('token') as string,
      'x-api-token': environment.X_API_TOKEN
    });
    return this.http
      .get<GetItemResponse>(url, {
        headers: headers,
        params: {
          search: query
        }
      })
      .pipe(
        map((res: GetItemResponse) => {
          if (res.status === 200) {
            return res
          } else {
            throw new Error("Error al conseguir la peticion");
          }
        }),
        catchError((err) => this.handleError(err))
      );
  }

  itemDetails(itemId: string): Observable<GetItemDescriptionResponse> {
    const url = environment.API_URL + `api/items/${itemId}`;
    const headers = new HttpHeaders({
      'x-authorization': sessionStorage.getItem('token') as string,
      'x-api-token': environment.X_API_TOKEN
    });
    return this.http
      .get<GetItemDescriptionResponse>(url, {
        headers: headers
      })
      .pipe(
        map((res: GetItemDescriptionResponse) => {
          if (res.status === 200) {
            return res
          } else {
            throw new Error("Error al conseguir detalle de producto");
          }
        }),
        catchError((err) => this.handleError(err))
      );
  }

  private handleError(err: any): Observable<never> {
    let errorMessage = 'ha ocurrido un error';
    if (err) {
      errorMessage = 'Error: code' + err.message;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
