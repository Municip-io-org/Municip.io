import { Component } from '@angular/core';
import { CitizenAuthService } from '../services/citizen-auth.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {
  user: any; 

  constructor(private citizenAuthService: CitizenAuthService) { }

  ngOnInit(): void {
    this.citizenAuthService.getUserData().subscribe(
      res => {
        this.user = res;
        console.log("user", this.user);
      },
      error => {
        console.error(error);
      }
    );
  }
}
