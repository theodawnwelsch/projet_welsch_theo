import { Component, OnInit } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  userForm: FormGroup;
  submitted: boolean = false;
  newUser: Users = {} as Users;

  constructor(private formBuilder: FormBuilder) {    
    this.userForm = this.formBuilder.group({
      password: ['',Validators.required],
      verifPsswd: ['',Validators.required],
      login: ['',[Validators.required, Validators.pattern("^[0-9a-zA-Z.-]*$")]],
    }, { 
      validator: this.passwordVerifValidator
    });
   }

  ngOnInit(): void {
  }


  onSubmitForm() {
    console.log("Submitted")
    const formValue = this.userForm.value;
    this.newUser = new Users(
      formValue['password'],
      formValue['login'],
    );
    this.submitted = true;
  }
  
  get password() { return this.userForm.get('password');}
  get login() { return this.userForm.get('login');}
  get verifPsswd() { return this.userForm.get('verifPsswd');}

  passwordVerifValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const verif = control.get('verifPsswd');

  return verif?.value != password?.value ? { passwordVerif: true } : null;
  };
  
}
