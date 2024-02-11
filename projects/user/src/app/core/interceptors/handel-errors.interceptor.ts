import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HandelErrorsInterceptor implements HttpInterceptor {

  constructor(
    private toster : ToastrService,    
    private router : Router
    ) {}


    private handleError = (error: HttpErrorResponse): Observable<never> => {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        this.toster.error('Network error', 'Please check your internet connection.');
      } else if (error.status === 500 || error.status === 400) {
        this.toster.error(error.error.message,'error');
        if (error.error.message =='jwt expired' || error.error.message == 'jwt must provided' || error.error.message == 'jwt malformed') 
          this.router.navigate(['/login']);
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
        this.toster.error('Unexpected error', 'An unexpected error occurred. Please try again later.');
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
