import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserAccess, UserLogin, UserLoginResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient, private router: Router) { }

  getAccess(): Observable<UserAccess | void> {
    const url = environment.API_URL + 'access';
    const headers = new HttpHeaders({ 'x-api-token': environment.X_API_TOKEN });
    return this.http
      .get<UserAccess>(url, {
        headers: headers
      })
      .pipe(
        map((res: UserAccess) => {
          console.log(res);
          sessionStorage.setItem('token', res.token);
        }),
        catchError((err) => this.handleError(err))
      );
  }

  signInUser(userLogin: UserLogin): Observable<UserLoginResponse | void> {
    const url = environment.API_URL + 'signIn';
    const headers = new HttpHeaders({ 
      'x-authorization': sessionStorage.getItem('token') as string,
      'x-api-token': environment.X_API_TOKEN
    });
    return this.http
      .post<UserLoginResponse>(url, userLogin, {
        headers: headers
      })
      .pipe(
        map((res: UserLoginResponse) => {
          console.log(res);
          if (res.status === 0) {
            sessionStorage.setItem('id', res.result.user_id);
            sessionStorage.setItem('login', 'true');
            this.router.navigate(['account']);
          } else {
            alert(res.message);
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
