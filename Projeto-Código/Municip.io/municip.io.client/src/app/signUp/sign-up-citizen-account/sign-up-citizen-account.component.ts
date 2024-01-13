import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitizenAuthService, Citizen } from '../../services/citizen-auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up-citizen-account',
  templateUrl: './sign-up-citizen-account.component.html',
  styleUrl: './sign-up-citizen-account.component.css'
})
export class SignUpCitizenAccountComponent {

  //use citizen auth service created
  constructor(private citizenAuthService: CitizenAuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    //write in console
console.log(form.value);
    if (form.valid) {
      this.citizenAuthService.registerCitizen(form.value as Citizen).subscribe(res => {
        console.log('Citizen created successfully!');
        this.router.navigateByUrl('');
      });
    }
  }
}
