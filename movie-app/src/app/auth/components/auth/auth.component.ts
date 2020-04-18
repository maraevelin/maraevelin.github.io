import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AuthStore from '../../store';
import { AuthConstants } from '../../shared/auth.shared';
import { Credentials } from '../../models/credentials.model';
import { AppState } from 'src/app/core/store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  destroyed$: Subject<boolean>;
  redirectUrl: string | undefined;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | undefined>;
  isSignIn = true;
  hidePassword = true;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.destroyed$ = new Subject<boolean>();
    this.isLoading$ = this.store.select(AuthStore.selectIsLoading);
    this.errorMessage$ = this.store.select(AuthStore.selectErrorMessage);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthStore.reset());

    this.route.queryParamMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params) => {
        this.redirectUrl = params.get(AuthConstants.REDIRECT_URL) || undefined;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  onSwitch(): void {
    this.isSignIn = !this.isSignIn;
    this.store.dispatch(AuthStore.reset());
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const credentials: Credentials = this.form.value;
    this.store.dispatch(
      this.isSignIn
        ? AuthStore.signIn({ credentials, returnUrl: this.redirectUrl })
        : AuthStore.signUp({ credentials, returnUrl: this.redirectUrl })
    );
  }
}
