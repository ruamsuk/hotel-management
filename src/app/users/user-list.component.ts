import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, signOut, user, User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-user-list',
  imports: [SharedModule],
  template: `
    <p>
      user-list works!
    </p>
  `,
  styles: ``
})
export class UserListComponent {
  auth = inject(Auth);
  firestore = inject(Firestore);
  router = inject(Router);
  http = inject(HttpClient);
  private timeout: any;

  currentUser$: Observable<User | null> = authState(this.auth);
  currenUser = toSignal<User | null>(this.currentUser$);

  constructor() {
    this.startTimer();
    this.getUserState().subscribe((user) => {
      if (user) {
        this.resetTimer();
      }
    });
  }

  getUserState(): Observable<any> {
    return user(this.auth);
  }

  startTimer() {
    this.timeout = setTimeout(
      () => {
        this.logout().then(() => {
          console.log('logout');
          this.router.navigateByUrl('/auth/login');
        });
      },
      30 * 60 * 1000,
    ); // 30 นาที
  }

  resetTimer() {
    clearTimeout(this.timeout);
    this.startTimer();
  }

  getTranslations(): Observable<any> {
    return this.http.get<any>('/assets/i18n/th.json');
  }

  async logout(): Promise<void> {
    return await signOut(this.auth);
  }
}
