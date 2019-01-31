import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { HttpClientModule } from '@angular/common/http';
import { EstadoBrComponent } from './models/estado-br/estado-br.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    CampoControlErroComponent,
    FormDebugComponent,
    EstadoBrComponent,
    ErrorMsgComponent,
  ],
  exports: [
    CampoControlErroComponent,
    FormDebugComponent,
    ErrorMsgComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
