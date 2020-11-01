import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenicationService } from '../_service/authenication.service';
import { NotificationService } from '../_service/notification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  color: string;
  loginform: FormGroup;
  loading = false;
  submitted = false;
  users: any[] = [];
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenicationService,
    private notifyService: NotificationService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  get f() { return this.loginform.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    }
    this.loading = true;
    const controls = this.loginform.controls;
    const authData = {
      username: controls.email.value,
      password: controls.password.value,
      grant_type: "password",
      client_id: 2,
      client_secret: "yxJCLBm7gBeNvG0ZHkJ2uNdBajQoBok0cmmCnoTh",
      scope: ""
    };
    this.authService.login(authData).pipe(first()).subscribe(data => {
      this.router.navigate([this.returnUrl]);
      this.notifyService.showSuccess("User Logined successfully !!", "");
    },
      error => {
        this.loading = false;
      });

  }


}
