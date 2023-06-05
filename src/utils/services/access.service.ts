import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppAccess } from '../interfaces/access';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private http: HttpClient) { }


  getAccess(): Observable<AppAccess | void> {
    const url = environment.API_URL + 'access';
    const headers = new HttpHeaders({ 'x-api-token': environment.X_API_TOKEN });
    return this.http
      .get<AppAccess>(url, {
        headers: headers
      })
      .pipe(
        map((res: AppAccess) => {
          console.log(res);
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('authenticated', 'true');
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
