import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form;
  constructor(
    private fb: FormBuilder,
    private auth:AuthService,
    private snackBar: MatSnackBar
  ){
    this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
  }  

  submit() {
    if (this.form.invalid) {
      console.error('Formulario inválido', this.form.value);

      this.snackBar.open('Por favor complete correctamente el formulario.', 'Cerrar', {
        duration: 3000,
    });

    return;
  }

  const { email, password } = this.form.value;
  const ok = this.auth.login(email ?? '', password ?? '');

  if (ok) {
    console.log('Login OK (fake backend)', { email });

    this.snackBar.open('Inicio de sesión exitoso ✅', 'Cerrar', {
      duration: 2500,
    });

  } else {
    console.error('Login FAIL (fake backend)');

    this.snackBar.open('Credenciales incorrectas. Intente de nuevo.', 'Cerrar', {
      duration: 3500,
    });
  }
}
}