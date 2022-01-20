import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm: FormGroup;

  constructor() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl(0, Validators.min(0)),
      rating: new FormControl(1, [
        Validators.min(1),
        Validators.max(5)
      ]),
    });
  }

  ngOnInit(): void {}

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.hasError(errorCode) && control.touched;
  }

}


/*
TODO Formulare

- Feedback
- Submit-Button
- Abschicken (HTTP)
- wenn erfolgreich:
  - Navigation zur Detailseite
  - (zurücksetzen)

*/
