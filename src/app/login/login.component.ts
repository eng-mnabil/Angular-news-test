import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
      });
      
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "/";
  }
  
  onSubmit() {
      this.submitted = true;
      console.log(this.loginForm);
      if(this.loginForm.invalid) {
          return;
      }
      this.loading = true;
      console.log('here');
      //call login service here 
      this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe(result=>{
          console.log(result);
          alert('Successful logged in as '+result['role']);
          this.router.navigate([this.returnUrl]);
      },err=>{
          console.log(err);
          alert(err['error']['message']);
          this.loading = false;
      })
  }

}
