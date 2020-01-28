import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/sharedService';
import { Messages } from 'src/app/services/messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage = '';
  recoveryForm: FormGroup;
  requestLoader = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.recoveryForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  get f() {
    return this.recoveryForm.controls;
  }

  forgot() {
    this.requestLoader = true;
    this.errorMessage = '';
    if (this.recoveryForm.invalid) {
      this.requestLoader = false;
      return;
    }

    const email = this.recoveryForm.get('email').value;
    this.authService.sendResetPassword(email).subscribe(() => {
      this.requestLoader = false;
      const msg = Messages.success.auth.forgotPwdMsg;
      this.sharedService.loginPageMessage.next({ success: true, msg});
      this.router.navigate(['/auth/login']);
    }, error => {
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
