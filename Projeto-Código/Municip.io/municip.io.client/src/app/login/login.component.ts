import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CitizenAuthService} from '../services/citizen-auth.service';
import { Router } from '@angular/router';
import { Login, UserAuthService } from '../services/user-auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [CitizenAuthService]
})
export class LoginComponent {

  user: Login = {
    
    email: '',
    password: '',
    twoFactorCode: "",
    twoFactorRecoveryCode :""
  };
  constructor(private citizenAuthService: CitizenAuthService, private userAuthService: UserAuthService,
      private router: Router) { }


  loginForm = new FormGroup({
    email: new FormControl(''),
    password : new FormControl('')
  });

  error: string = "";

   onSubmit() {
    
     //nao esta a ter o user e pass (null) e falta fazer a navigation apenas quando for autenticado
     this.userAuthService.login(this.loginForm.value as Login, true, true).subscribe(
       res => {
         this.error = "";
        this.router.navigateByUrl('/userpage');
      },
       error => {
         console.log(error);
         this.error = "Erro de autenticação";
      }
    );
  }
}
