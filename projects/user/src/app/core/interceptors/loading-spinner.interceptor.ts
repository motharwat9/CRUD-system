import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private spinner:NgxSpinnerService
    ) {}


  counter: number = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    this.counter++;
    return next.handle(request).pipe(finalize(()=>{
      this.counter--;
      if (this.counter == 0) {
        this.spinner.hide();
      }
    }))
  }
}
