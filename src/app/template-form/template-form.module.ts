import { TemplateFormComponent } from './template-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [TemplateFormComponent, FormDebugComponent,CampoControlErroComponent,],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class TemplateFormModule { }
