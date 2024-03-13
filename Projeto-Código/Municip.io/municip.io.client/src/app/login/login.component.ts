import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CitizenAuthService } from '../services/citizen-auth.service';
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
    twoFactorRecoveryCode: ""
  };
  constructor(private citizenAuthService: CitizenAuthService, private userAuthService: UserAuthService,
    private router: Router) { }


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  error: string = "";
  browserId: string = "";
  onSubmit() {
    var email = this.loginForm.value.email || "";
    //nao esta a ter o user e pass (null) e falta fazer a navigation apenas quando for autenticado
    this.userAuthService.login(this.loginForm.value as Login, true, true).subscribe(
      res => {
        this.error = "";

        this.userAuthService.getUserRole().subscribe(
          res => {
            var userAgent = navigator.userAgent;
            console.log('User-Agent:', userAgent);
            this.role = res.role;
            this.user.email = res.email;

            this.userAuthService.getInfoByEmail(email).subscribe(
              res => {

                console.log(res);
                this.browserId = this.hashString(userAgent);
                console.log('Browser ID:', this.browserId);

                //send email if browser id is not in the list
                //utiliza o servico para get

                this.userAuthService.getBrowserHistory(email).subscribe(

                  res => {
                    console.log(res);
                    //se nao existir envia email

                    var found = false;
                    for (var i = 0; i < res.length; i++) {
                      console.log(res[i].userAgent, this.browserId)

                      if (res[i].userAgent == this.browserId) {
                        found = true;
                        break;
                      }
                    }


                    this.userAuthService.updateBrowserHistory(email, this.browserId).subscribe(
                      res => {
                        console.log(res);
                      },
                      error => {
                        console.error(error);
                      }
                    );


                    if (!found) {
                      this.userAuthService.sendEmail(email).subscribe(
                        res => {

                          console.log("LA VAI MAIL", res);
                        },
                        error => {
                          console.error(error);
                        }
                      );
                    }
                  }
                );



                if (this.role == "Citizen") {
                  this.router.navigateByUrl('/citizen/homePage');
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
        console.log(error);
        this.error = "Erro de autenticação";
      }
    );
  }
  hashString(str: string): string {
    let hash = 0;
    if (str.length === 0) {
      return hash.toString();
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }
}
