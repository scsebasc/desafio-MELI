import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserAccountInfoResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getUserAccount(): Observable<any> {
    const url = environment.API_URL + 'users/account/' + sessionStorage.getItem('id') as string;
    const headers = new HttpHeaders({ 
      'x-authorization': sessionStorage.getItem('token') as string,
      'x-api-token': environment.X_API_TOKEN
    });
    return this.http
      .get<UserAccountInfoResponse>(url, {
        headers: headers
      })
      .pipe(
        map((res: UserAccountInfoResponse) => {
          console.log(res);
          if (res.status === 0) {
            return res.result;
          } else {
            alert('Error al obtener datos');
          }
        }),
        catchError((err) => this.handleError(err))
      );
  }

  getAccountHistory(accountNumber: string): Observable<any> {
    const url = environment.API_URL + 'users/accounthistory/' + accountNumber;
    const headers = new HttpHeaders({ 
      'x-authorization': sessionStorage.getItem('token') as string,
      'x-api-token': environment.X_API_TOKEN
    });
    return this.http
      .get<UserAccountInfoResponse>(url, {
        headers: headers
      })
      .pipe(
        map((res: UserAccountInfoResponse) => {
          console.log(res);
          if (res.status === 0) {
            return res.result;
          } else {
            alert('Error al obtener datos');
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
