import { Component } from '@angular/core';

@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrl: './show-hide-password.component.css'
})
export class ShowHidePasswordComponent {
  public showPassword: boolean | undefined;
  password: string | undefined;

  show = false;

  ngOnInit() {
    this.password = 'password';
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
