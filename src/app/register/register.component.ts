import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../models/registerUser';
import { AuthService } from '../services/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  user: User;

  registerUser: RegisterUser;
  userAddForm: FormGroup;

  createUserForm() {
    this.userAddForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createUserForm();
  }

  register(){
    this.authService.register(this.registerUser)
  }

  add() {
    if (this.userAddForm.valid) {
      this.user = Object.assign({}, this.userAddForm.value);
      this.authService.register(this.registerUser);
    }
  }
}
