import { Component, OnInit } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { Users } from 'src/app/models/users';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  userForm: FormGroup;
  submitted: boolean = false;
  newUser$: Observable<Users>;

  constructor(private formBuilder: FormBuilder, private authService : AuthorizationService) {    
    this.userForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      password: ['',Validators.required],
      verifPsswd: ['',Validators.required],
      login: ['',[Validators.required, Validators.pattern("^[0-9a-zA-Z.-]*$")]],
    }, { 
      validator: this.passwordVerifValidator
    });
   }

  ngOnInit(): void {
    
  }


  onSubmit(): void {
    console.log("Submitted")
    if (this.userForm.valid)
    {
      console.log(this.userForm.value);
      this.authService.postSignin(this.login?.value, this.password?.value, this.prenom?.value, this.nom?.value).subscribe(
        val => {
          console.log("Client created");
          this.newUser$ = this.authService.postLogin(this.login?.value, this.password?.value);
        }
      )
    }
    else
    {
      Object.keys(this.userForm.controls).forEach(field => {
        const control = this.userForm.get(field);
        control?.markAsTouched({ onlySelf: true});
      });
    }
    this.submitted = true;
  }
  
  get password() { return this.userForm.get('password');}
  get login() { return this.userForm.get('login');}
  get verifPsswd() { return this.userForm.get('verifPsswd');}
  get prenom() { return this.userForm.get('prenom');}
  get nom() { return this.userForm.get('nom');}

  passwordVerifValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const verif = control.get('verifPsswd');

  return verif?.value != password?.value ? { passwordVerif: true } : null;
  };
  
}
