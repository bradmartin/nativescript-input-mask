import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMask } from '@bradmartin/nativescript-input-mask';
import {
  NativeScriptFormsModule,
  NativeScriptModule,
  registerElement
} from '@nativescript/angular';
import { AppComponent } from './app.component';

registerElement('InputMask', () => InputMask);

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
