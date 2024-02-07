import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/loading-spinner.interceptor';
import { HandelErrorsInterceptor } from './interceptors/handel-errors.interceptor';
import { SendTokenInterceptor } from './interceptors/send-token.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor ,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: HandelErrorsInterceptor ,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: SendTokenInterceptor ,
      multi: true
    },
  ]
})
export class CoreModule { }
