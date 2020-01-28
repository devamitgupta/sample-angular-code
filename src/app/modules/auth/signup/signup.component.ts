import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { AuthService } from '../auth.service';
import { SharedService } from 'src/app/services/sharedService';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Messages } from 'src/app/services/messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit, OnDestroy {
  token = '';
  signupForm: FormGroup;
  errorMessage = '';
  showPwd = false;
  requestLoader = false;
  private unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private ngxService: NgxUiLoaderService,
    private fb: FormBuilder
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.ngxService.start();
    this.initForm();
    this.authService.verifyInvite(this.token).subscribe((res: any) => {
      this.ngxService.stop();
      this.signupForm.patchValue(res);
    }, e => {
      this.ngxService.stop();
      const error = e && e.error && e.error.detail ? e.error.detail : Messages.errors.invalidLink;
      this.sharedService.loginPageMessage.next({ msg: error, success: false});
      this.router.navigate(['/auth/login']);
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  initForm() {
    this.signupForm = this.fb.group({
      email: [{ value: '', disabled: true}, Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.authService.regexValidator(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])'), { camelCase: '' }),
        this.authService.regexValidator(new RegExp('^(?=.*?[!@£$%^&*()])'), { specialCharacter: '' })
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.authService.confirmPasswordValidator
      ]]
    });

    this.signupForm.get('password').valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.signupForm.get('confirmPassword').updateValueAndValidity();
      });
  }

  signUp() {
    this.requestLoader = true;
    this.errorMessage = '';
    if (this.signupForm.invalid) {
      return this.requestLoader = false;
    }

    this.authService.signup(this.token, this.signupForm.value).subscribe((res: any) => {
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('profile', JSON.stringify(res));
        const userName = res.first_name + ' ' + res.last_name;
        localStorage.setItem('userName', userName);
        this.router.navigate(['/main/dashboard']);
      }
      this.requestLoader = false;
    }, error => {
      this.requestLoader = false;
      this.showMessage(error.error.detail);
    });
  }

  allowAlphaNumeric(event: KeyboardEvent): boolean {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      return true;
    } else if (event.keyCode >= 97 && event.keyCode <= 122) {
      return true;
    } else {
      return false;
    }
  }

  showMessage(msg) {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
