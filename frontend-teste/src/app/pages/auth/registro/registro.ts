import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  registroForm!: FormGroup
  errorText = ''
  successText = ''
  mostrarSenha = false
  mostrarConfirmarSenha = false

  constructor(
    private fb: FormBuilder, private authService: AuthService
  ) {
    this.registroForm = this.fb.group({
      nomeCompleto: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    })
  }

  onClick() {
    this.registrarUsuario()
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha
  }

  toggleConfirmarSenha() {
    this.mostrarConfirmarSenha = !this.mostrarConfirmarSenha
  }

  registrarUsuario() {
    this.authService.registro(
      this.registroForm.value.nomeCompleto,
      this.registroForm.value.email,
      this.registroForm.value.username,
      this.registroForm.value.password,
      this.registroForm.value.password_confirmation
    ).subscribe({
      next: (res: any) => {
        console.log(res)
        this.errorText = ''
        this.successText = 'Cadastro realizado com sucesso! Faça login aqui:'
      }, error: (err: any) => {
        console.log(err)
        console.log(this.registroForm.value)
        this.successText = ''
        this.errorText = err.error.messages.errors[0].message
      }
    })
  }
}

