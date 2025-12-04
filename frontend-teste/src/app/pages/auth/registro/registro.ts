import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {


  nomeCompletoInput = new FormControl('')
  emailInput = new FormControl('')
  usernameInput = new FormControl('')
  passwordInput = new FormControl('')
  passwordConfirmationInput = new FormControl('')
  nascimentoInput = new FormControl('')
  
}
