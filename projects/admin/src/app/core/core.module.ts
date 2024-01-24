import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptorInterceptor } from './interceptor/my-interceptor.interceptor';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { HandelErrorsInterceptor } from './interceptor/handel-errors.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: HandelErrorsInterceptor,
      multi: true
    },
  ]

})
export class CoreModule { }
