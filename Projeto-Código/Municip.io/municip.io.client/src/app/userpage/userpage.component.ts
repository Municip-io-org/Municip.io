import { Component, Query } from '@angular/core';
import { CitizenAuthService } from '../services/citizen-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {
  user: any;


  isMunicipalAdministrator: boolean = false;
  constructor(private citizenAuthService: CitizenAuthService, private router: Router  ) { }

  ngOnInit(): void {
    this.citizenAuthService.getUserData().subscribe(
      res => {
        this.user = res;
        this.citizenAuthService.getInfoByEmail(this.user.email).subscribe(
          res => {
            this.user = res;
            console.log("user", this.user);
            // if user is municipality admin send more the info avout the municipality
            if (this.user.municipality != null) {
              this.citizenAuthService.getInfoMunicipality(this.user.municipality).subscribe(
                res => {
                  this.user.municipalityInfo = res;
                  this.isMunicipalAdministrator = true;
                  console.log("user", this.user);
                },
                error => {
                  console.error(error);
                }
              );
            }

          });
          },
      error => {
        this.router.navigateByUrl('/loginpage');
        console.error(error);
      }
    );
  }
  getUserAttributes(): { key: string, value: any }[] {
    if (!this.user) {
      return [];
    }
    // Extract key-value pairs from user object
    return Object.keys(this.user).map(key => ({ key, value: this.user[key] }));
  }

  getMunicipalityAttributes(): { key: string, value: any }[] {

if (!this.user.municipalityInfo) {
      return [];
    }
    // Extract key-value pairs from user object
    return Object.keys(this.user.municipalityInfo).map(key => ({ key, value: this.user.municipalityInfo[key] }));

  }
}
