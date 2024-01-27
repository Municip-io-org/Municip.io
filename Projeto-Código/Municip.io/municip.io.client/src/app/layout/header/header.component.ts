import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public isSignedIn: boolean = false;

  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit() {
    this.auth.onStateChanged().forEach((state: any) => {
      this.auth.isSignedIn().forEach((signedIn: boolean) => this.isSignedIn = signedIn);
    });
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
