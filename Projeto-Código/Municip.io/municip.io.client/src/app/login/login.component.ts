import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Citizen, CitizenAuthService } from '../services/citizen-auth.service';
import { Router } from '@angular/router';
import { Login, UserAuthService } from '../services/user-auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [CitizenAuthService]
})
 /**
  * Login component
  *
  * Classe que contem a logica do login
  *
  * @param role - variavel que guarda a role do utilizador
  * @param user - variavel que guarda o email, password, twoFactorCode e twoFactorRecoveryCode
  * @param newUser - variavel que guarda o novo utilizador
  * @param loginForm - Formulario de login
  * @param error - variavel que guarda o erro
  * @param browserId - variavel que guarda o browserId
  * @param userLogged - variavel que guarda o utilizador a logar
  * 
  */
export class LoginComponent {

  role: string = "";
  user: Login = {

    email: '',
    password: '',
    twoFactorCode: "",
    twoFactorRecoveryCode: ""
  };
  newUser: any;
  userLogged: Citizen = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    nif: '',
    gender: '',
    municipality: '',
    address: '',
    postalCode1: '',
    postalCode2: '',
    birthDate: new Date(),
    photo: '',
  };

  /**
   * @constructor
   * LoginComponent
   *
   * @param citizenAuthService - Serviço de autenticação do cidadão
   * @param userAuthService - Serviço de autenticação do cidadão
   * @param router - O Router
   */
  constructor(private citizenAuthService: CitizenAuthService, private userAuthService: UserAuthService,
    private router: Router) { }


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  error: string = "";
  browserId: string = "";

  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
  ngOnInit(): void {

    localStorage.clear();
  }

  /**
   * onSubmit
   *
   * Função que é chamada quando o utilizador faz submit do formulario de login
   */
  onSubmit() {

    localStorage.clear();

    var email = this.loginForm.value.email || "";
    var emailToParse = email;
    var emailParsed = emailToParse.replace('@', '%40');
    this.userAuthService.getInfoByEmail(emailParsed).subscribe(
      res => {
        this.newUser = res;
        this.userLogged = this.newUser;
        console.log("PARA",this.newUser);
        if (this.newUser.status == 'Approved' || this.newUser.status == undefined) {

          localStorage.clear();
          this.userAuthService.login(this.loginForm.value as Login, true, true).subscribe(
            res => {
              var userAgent = navigator.userAgent;
              console.log('User-Agent:', userAgent);
              this.browserId = this.hashString(userAgent);
              console.log('Browser ID:', this.browserId);
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
                    this.userAuthService.sendEmail(this.userLogged ).subscribe(
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

              this.userAuthService.getUserRole().subscribe(
                roleRes => {
                  this.role = roleRes.role;
                  console.log("A ROLE É", this.role);
                  if (this.role == 'Admin') {
                    this.router.navigateByUrl('/admindashboard');
                  } else if (this.role == 'Municipal') {
                    this.router.navigateByUrl('/municipal/homePage');
                  } else {
                    this.router.navigateByUrl('/citizen/homePage');
                  }
                },
                roleError => {
                  console.error(roleError);
                }
              );
              //role check

            },
            error => {
              console.log(error);
              this.error = "Erro de autenticação";
            }
          );


        } else {
          this.router.navigateByUrl('/acessBlocked');
        }
      },

      error => {
        console.error(error);
          this.error = "Erro de autenticação";
      }
    );
   


  }

  /**
   * hashString
   *
   * Função que gera um hash de uma string para guardar o browserId
   *
   * @param str - string a ser hashed 
   */
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


