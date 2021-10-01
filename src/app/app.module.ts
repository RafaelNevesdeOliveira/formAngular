import { TemplateFormModule } from './template-form/template-form.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataFormModule } from './data-form/data-form.module';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TemplateFormModule,
    DataFormModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
