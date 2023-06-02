import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Transfer, TransferResponse } from '../interfaces/transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient, private router: Router) { }

  transferToOtherAccount(transfer: Transfer): Observable<TransferResponse | void> {
    const url = environment.API_URL + 'transfer/otherAccount';
    const headers = new HttpHeaders({ 
      'x-authorization': sessionStorage.getItem('token') as string,
      'x-api-token': environment.X_API_TOKEN
    });
    return this.http
      .post<TransferResponse>(url, transfer, {
        headers: headers
      })
      .pipe(
        map((res: TransferResponse) => {
          console.log(res);
          if (res.status === 0) {
            alert('Transferencia exitosa');
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
