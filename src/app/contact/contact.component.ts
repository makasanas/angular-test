import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ContactService } from './contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;
  public contactData: Object = {
    "To": "",
    "Subject": "",
    "Body": ""
  };

  constructor(private formBuilder: FormBuilder, private _contactService: ContactService) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      company: ['', Validators.required],
      country: '',
      website: ['', Validators.required],
      websiteUrls: ''
    });
  }

  ngOnInit() {
  }

  submitForm() {
    console.log(this.contactForm.get('email'));
    var filtered = this.contactForm.value.websiteUrls.split('\n').filter(function (el) {
      return el != null && el != '' && el != undefined;
    });
    console.log(filtered);

    if (this.contactForm.valid) {
      console.log(this.contactForm.controls.email.value);
      console.log(this.contactData);
      this.contactData['To'] = this.contactForm.controls.email.value;
      this.contactData['Subject'] = this.contactForm.controls.name.value;
      this.contactData['Body'] = this.contactForm.controls.websiteUrls.value;
      console.log(this.contactData);
      this._contactService.sendMail(this.contactData).subscribe((res) => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    } else {
      console.log("invalid form");
      this.markFormGroupTouched(this.contactForm);
    }

  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    })
  }


}
