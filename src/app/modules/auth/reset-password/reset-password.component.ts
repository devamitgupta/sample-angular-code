import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  token = '';
  errorMessage = '';
  resetPwdForm: FormGroup;
  private unsubscribeAll: Subject<any>;
  showPwd = false;
  requestLoader = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.initForm();
  }

  get f() {
    return this.resetPwdForm.controls;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  initForm() {
    this.resetPwdForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.authService.regexValidator(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])'), { camelCase: '' }),
        this.authService.regexValidator(new RegExp('^(?=.*?[!@£$%^&*()])'), { specialCharacter: '' })
      ]],
      confirm_password: ['', [
        Validators.required,
        this.authService.confirmPasswordValidator
      ]]
    });

    this.resetPwdForm.get('password').valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.resetPwdForm.get('confirm_password').updateValueAndValidity();
      });
  }

  reset() {
    this.requestLoader = true;
    this.errorMessage = '';
    if (this.resetPwdForm.invalid) {
      return this.requestLoader = false;
    }

    this.authService.resetPassword(this.token, this.resetPwdForm.value).subscribe(res => {
      this.router.navigate(['/auth/login']);
      this.requestLoader = false;
    }, error => {
      this.resetPwdForm.reset();
      this.requestLoader = false;
      this.showMessage(error.error.detail);
    });
  }

  showMessage(msg) {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

}
