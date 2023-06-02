import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserSignUp, UserSignUpResponse } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient, private router: Router) { }

  suscription(userData: UserSignUp): Observable<UserSignUpResponse | void> {
    const url = environment.API_URL + 'users/add';
    const headers = new HttpHeaders({
      'x-authorization': sessionStorage.getItem('token') as string,
      'x-api-token': environment.X_API_TOKEN
    });
    console.log(headers);
    return this.http.post<UserSignUpResponse>(url, userData, {
      headers
    })
    .pipe(
      map((res: UserSignUpResponse) => {
        console.log(res);
        if (res.status === 0) {
          this.router.navigate(['login']);
        } else {
          alert('Usuario no se ha podido crear')
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
