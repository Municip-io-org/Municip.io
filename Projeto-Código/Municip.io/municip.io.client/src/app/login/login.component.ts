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

  role: string = "";
  user: Login = {
    
    email: '',
    password: '',
    twoFactorCode: "",
    twoFactorRecoveryCode :""
  };
  constructor(private citizenAuthService: CitizenAuthService, private userAuthService: UserAuthService,
      private router: Router) { }

  newUser: any;

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
       

         this.userAuthService.getUserData().subscribe(
           res => {
             this.user = res;
             var emailToParse = this.user.email;
             var emailParsed = emailToParse.replace('@', '%40');
             this.userAuthService.getInfoByEmail(emailParsed).subscribe(
               res => {
                 this.newUser = res;


                 this.userAuthService.getUserRole().subscribe(
                   res => {
                     console.log("res", this.newUser);
                     this.role = res.role;
                     console.log("role", this.role );
                     if (this.role == "Citizen") {
                       if (this.newUser.status == 'Approved') {
                         this.router.navigateByUrl('/citizen/homePage');
                       } else {
                         this.router.navigateByUrl('/acessBlocked');
                       } 
                     } else {
                       this.router.navigateByUrl('/municipal/homePage');
                     }

                   },
                   error => {
                     console.error(error);
                   }
                 );
               },
               error => {
                 console.error(error);

               }
             );
           },
           error => {
             console.error(error);
           }
         );

         
      },
       error => {
         console.log(error);
         this.error = "Erro de autenticação";
      }
    );
  }
}
