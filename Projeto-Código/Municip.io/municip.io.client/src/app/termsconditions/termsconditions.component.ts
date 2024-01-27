import { Component } from '@angular/core';
import { CitizenAuthService } from '../services/citizen-auth.service';

@Component({
  selector: 'app-termsconditions',
  templateUrl: './termsconditions.component.html',
  styleUrl: './termsconditions.component.css'
})
export class TermsconditionsComponent {
  user: any;
  constructor(private citizenAuthService: CitizenAuthService) { }

  ngOnInit(): void {
    //this.citizenAuthService.getUserData().subscribe(
    //  res => {
    //    this.user = res;
    //    console.log("user", this.user);
    //  },
    //  error => {
    //    console.error(error);
    //  }
    //);
  }
}
