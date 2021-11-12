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
      prenom: ['',[Validators.required, Validators.pattern("^[a-zA-Zéèïêëö'.-]{2,25}$")]],
      nom: ['',[Validators.required, Validators.pattern("^[a-zA-Zéèïêëö'.-]{2,25}$")]],
      adresse: ['',[Validators.required, Validators.pattern("^[a-zA-Zéèïêëö'. 0-9-]*$")]],
      cp: ['',[Validators.required, Validators.pattern("^[0-9]{5}$")]],
      ville: ['',[Validators.required, Validators.pattern("^[a-zA-Zéèïêëö'. -]*$")]],
      tel: ['',[Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      civilite: ['',Validators.required],
      password: ['',Validators.required],
      verifPsswd: ['',Validators.required],
      login: ['',[Validators.required, Validators.pattern("^[0-9a-zA-Z.-]*$")]],
      pays: ['', [Validators.required, Validators.pattern("^[a-zA-Zéèïêëö'. -]*$")]]
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
      formValue['prenom'],
      formValue['nom'],
      formValue['adresse'],
      formValue['cp'],
      formValue['ville'],
      formValue['tel'],
      formValue['email'],
      formValue['civilite'],
      formValue['password'],
      formValue['login'],
      formValue['pays']
    );
    this.submitted = true;
  }
  
  get prenom() { return this.userForm.get('prenom');}
  get nom() { return this.userForm.get('nom');}
  get adresse() { return this.userForm.get('adresse');}
  get cp() { return this.userForm.get('cp');}
  get ville() { return this.userForm.get('ville');}
  get tel() { return this.userForm.get('tel');}
  get email() { return this.userForm.get('email');}
  get civilite() { return this.userForm.get('civilite');}
  get password() { return this.userForm.get('password');}
  get login() { return this.userForm.get('login');}
  get pays() { return this.userForm.get('pays');}
  get verifPsswd() { return this.userForm.get('verifPsswd');}




  passwordVerifValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const verif = control.get('verifPsswd');

  return verif?.value != password?.value ? { passwordVerif: true } : null;
  };
  
}
