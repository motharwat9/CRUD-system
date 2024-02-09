import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from './material/material.module';
import { CoreModule } from './core/core.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardModule } from './dashboard/dashboard.module';
// import { TaskAdminModule } from './dashboard/task-admin/task-admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    AuthModule,
    ToastrModule.forRoot({
      preventDuplicates:true,
      timeOut:2000,
      easing:'ease-in',
      easeTime:1000
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    NgxPaginationModule,
    // TaskAdminModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
