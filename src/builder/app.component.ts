import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators, FormControl
} from '@angular/forms';


function skuValidator(control: FormControl): {[s: string]: boolean} {
  if (!control.value.match(/^123/)) {
    return {invalidSku: true};
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm: FormGroup;
  sku: AbstractControl;
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku': ['', Validators.compose([
        Validators.required, skuValidator
      ])]
    });
    this.sku = this.myForm.controls['sku'];
    this.sku.valueChanges.subscribe((value:string) => {
      console.log('sku changed to:', value);
    });
    this.myForm.valueChanges.subscribe( (form: any) => {
          console.log('form changed to:', form);
        }
    );
  }
  onSubmit(value: string): void {
    console.log('you submitted value:', value);
  }
}
