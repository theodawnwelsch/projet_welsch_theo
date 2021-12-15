import { Component, OnInit } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  user$!: Observable<Users>;

  constructor(private formBuilder: FormBuilder, private authService: AuthorizationService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      password: ['',Validators.required],
      login: ['',[Validators.required, Validators.pattern("^[0-9a-zA-Z.-]*$")]]    
   });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid)
    {
      console.log(this.loginForm.value);
      this.authService.postLogin(this.login?.value, this.password?.value).subscribe(
        (val) => {
          console.log("User logged in");
          this.user$ = this.authService.getLogin(this.login?.value);
        }
      )
    }
    else
    {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true});
      });
    }
  }

  get password() { return this.loginForm.get('password');}
  get login() { return this.loginForm.get('login');}
}
