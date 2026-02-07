import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // "Credenciales quemadas" (fake backend)
  private readonly fakeUser = {
    email: 'appweb@udv.edu.gt',
    password: '152026',
  };

  login(email: string, password: string): boolean {
    const ok =
      email === this.fakeUser.email && password === this.fakeUser.password;

    if (!ok) {
      console.error('Credenciales incorrectas (fake backend)');
    }

    return ok;
  }
}
