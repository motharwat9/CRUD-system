import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from './core/core.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastrModule.forRoot({
      preventDuplicates:true,
      timeOut:2000,
      easing:'ease-in',
      easeTime:1000
    }),
    CoreModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
