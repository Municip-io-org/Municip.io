import { Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-loggedin',
  templateUrl: './header-loggedin.component.html',
  styleUrl: './header-loggedin.component.css'
})
export class HeaderLoggedinComponent {
  isSignedIn: boolean = false;
  user: any;
  firstName: string = '';
  photo: string = '';
  role: string = '';
  showDropdownAgenda: boolean = false;
  showDropdownBiblioteca: boolean = false;
  showDropdownDocumentos: boolean = false;
  showDropdownNoticias: boolean = false;
  showDropdownTransportes: boolean = false;
  showSignOutDropdown: boolean = false;

  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit() {
    this.auth.onStateChanged().forEach((state: any) => {
      this.auth.isSignedIn().forEach((signedIn: boolean) => this.isSignedIn = signedIn);
    });

    this.auth.getUserData().subscribe(
      res => {
        this.user = res;
        var emailToParse = this.user.email;
        var emailParsed = emailToParse.replace('@', '%40');
        this.auth.getInfoByEmail(emailParsed).subscribe(
          res => {
            this.user = res;
            this.firstName = this.user.firstName;
            this.photo = this.user.photo;
    
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

    this.auth.getUserRole().subscribe(
      res => {
        if (res.role == Roles.Citizen) {
          this.role = res.role;
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  signOut() {
    if (this.isSignedIn) {
      this.auth.signOut().forEach(response => {
        if (response) {
          this.router.navigateByUrl('');
        }
      });
    }
  }
}
  

  


