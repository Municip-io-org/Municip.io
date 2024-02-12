import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.css'
})
export class ProfileBannerComponent {
  @Input() title: string = "";
  @Input() text: string = "";
  @Input() image: string = "";
  @Input() profileimg: string = "";
}
