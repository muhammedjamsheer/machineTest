import { Component, OnInit } from '@angular/core';
import { AuthenicationService } from '../_service/authenication.service';
import { NotificationService } from '../_service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser;
  constructor(
    private router: Router,
    private authService: AuthenicationService,
    private notifyService: NotificationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.notifyService.showSuccess("User loggouted successfully !!","");


  }
}
