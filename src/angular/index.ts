import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerElement } from '@nativescript/angular';
import { InputMaskTextValueAccessor } from './input-mask.directive';

@NgModule({
  declarations: [InputMaskTextValueAccessor],
  providers: [],
  imports: [FormsModule],
  exports: [InputMaskTextValueAccessor, FormsModule]
})
export class NativeScriptInputMaskModule {}

registerElement('InputMask', () => require('../').InputMask);
