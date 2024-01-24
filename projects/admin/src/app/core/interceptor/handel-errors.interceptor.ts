import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HandelErrorsInterceptor implements HttpInterceptor {

  constructor(private toster:ToastrService) {}

  private handleError=(error: HttpErrorResponse)=>{
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toster.error('error','ERR_INTERNET_DISCONNECTED')
    }else if(error.status === 500){
      this.toster.error('error',error.error.message)
    } 
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code , body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(this.handleError)
      );
  }
}
