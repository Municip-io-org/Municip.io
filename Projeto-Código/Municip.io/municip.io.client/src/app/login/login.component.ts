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
    // Ensure user and pass are not null, and navigate only when authenticated
    this.userAuthService.login(this.loginForm.value as Login, true, true).subscribe(
      res => {
        this.error = "";

        this.userAuthService.getUserData().subscribe(
          userRes => {
            this.user = userRes;
            var emailToParse = this.user.email;
            var emailParsed = emailToParse.replace('@', '%40');

            this.userAuthService.getUserRole().subscribe(
              roleRes => {
                console.log("roleRes", roleRes);
                this.role = roleRes.role;

                if (this.role == 'Admin') {
                  this.router.navigateByUrl('/admindashboard');
                } else {
                  this.userAuthService.getInfoByEmail(emailParsed).subscribe(
                    infoRes => {
                      this.newUser = infoRes;

                      if (this.newUser.status == 'Approved') {
                        if (this.role == "Citizen") {
                          this.router.navigateByUrl('/citizen/homePage');
                        } else {
                          this.router.navigateByUrl('/municipal/homePage');
                        }
                      } else {
                        this.router.navigateByUrl('/acessBlocked');
                      }
                    },
                    infoError => {
                      console.error(infoError);
                    }
                  );
                }
              },
              roleError => {
                console.error(roleError);
              }
            );
          },
          userError => {
            console.error(userError);
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

