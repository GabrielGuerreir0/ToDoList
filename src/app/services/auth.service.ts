import { Injectable, Inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth); // 🔥 Forma correta de injeção no Angular moderno

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log('Usuário logado com sucesso:', userCredential.user);
      console.log('Token de autenticação:', userCredential);
      return userCredential;
    } catch (error) {
      console.error('Erro de login', error);
      throw error;
    }
  }

  async logout() {
    return signOut(this.auth);
  }
}
