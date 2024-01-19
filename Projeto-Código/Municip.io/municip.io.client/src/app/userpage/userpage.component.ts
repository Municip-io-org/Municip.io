import { Component, Query } from '@angular/core';
import { CitizenAuthService } from '../services/citizen-auth.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {
  user: any;
  newUser: any;

  constructor(private citizenAuthService: CitizenAuthService) { }

  ngOnInit(): void {
    this.citizenAuthService.getUserData().subscribe(
      res => {
        this.user = res;
        this.citizenAuthService.getInfoByEmail(this.user.email).subscribe(
          res => {
            this.newUser = res;

            console.log("user", this.newUser);
          });
          },
      error => {
        console.error(error);
      }
    );
  }
  getUserAttributes(): { key: string, value: any }[] {
    if (!this.newUser) {
      return [];
    }

    // Extract key-value pairs from user object
    return Object.keys(this.newUser).map(key => ({ key, value: this.newUser[key] }));
  }
}
