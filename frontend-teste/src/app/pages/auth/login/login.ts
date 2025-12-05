import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup
  errorText = ''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe({
      next: (res: any) => {
        this.errorText = ''
        console.log(res)
        setTimeout(() => {
          this.router.navigate([''])
        }, 1500)
      }, error: (err: any) => {
        console.log(err)
        this.errorText = err.error.message
      }
    })
  }
}
