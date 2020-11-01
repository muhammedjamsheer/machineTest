import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RegisterService } from '../_service/register.service';
import { NotificationService } from '../_service/notification.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  color: string;
  registerform: FormGroup;
  loading = false;
  submitted = false;
  users:any[]=[];
  types: any = [
    { id: 1, name: "education" },
    { id: 2, name: "recreational" },
    { id: 3, name: "social" },
    { id: 4, name: "diy" },
    { id: 5, name: "charity" },
    { id: 6, name: "cooking" },
    { id: 7, name: "relaxation" },
    { id: 8, name: "music" },
    { id: 9, name: "busywork" },
  ]
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService,
    private notifyService : NotificationService
  ) { }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: [null, Validators.required],
    });
    this.getAllUsers();
  }


  async getAllUsers() {
    this.registerService.getAllUsers().subscribe(response => {
      this.users = response;
    })
  }
  get f() { return this.registerform.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    }
    this.loading = true;

    this.registerService.registerUser(this.registerform.value).pipe(first()).subscribe(data => {
        this.router.navigate(['/activities']);
        this.notifyService.showSuccess("User registerd successfully !!","");
      },
      error => {
        this.loading = false;
      });


  }

}
