import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedService } from 'src/app/services/sharedService';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store';
import { UserService } from '../../../services/user.service';
import { Messages } from 'src/app/services/messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public messageSubs: any;
  public requestLoader = false;
  public message = {
    msg: '',
    success: false
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private sharedService: SharedService,
    private store: Store<fromRoot.AppState>
  ) {

  }

  ngOnInit() {
    this.messageSubs = this.sharedService.loginPageMessage.subscribe(message => {
      if (message && message.msg) {
        this.showMessage(message);
      }
    });
    this.initForm();
  }

  ngOnDestroy() {
    if (this.messageSubs) {
      this.messageSubs.unsubscribe();
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login = (): void => {
    this.message.msg = '';
    this.requestLoader = true;

    if (this.loginForm.invalid) {
      this.requestLoader = false;
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if (res && res.token) {
        localStorage.setItem('token', res.token);

        // Get Logged In User Details
        this.userService.getLoggedInUserDetails().subscribe(resp => {
          this.store.dispatch(new fromRoot.SaveDataSuccessAction(resp));
        }, (e) => {
          this.requestLoader = false;
          // TODO:
        });

        // Get Logged In User Permissions
        this.userService.userPermission().subscribe(resp => {
          this.store.dispatch(new fromRoot.SavePermissionSuccessAction(resp));
          this.router.navigate(['/main/dashboard']);
          this.requestLoader = false;
        }, (e) => {
          this.requestLoader = false;
          // TODO:
        });
      }
    }, (e) => {
      this.requestLoader = false;
      const error = e && e.error && e.error.detail ? e.error.detail : Messages.errors.loginErr;
      this.showMessage({
        msg: error,
        success: false
      });
    });
  }

  showMessage(msg) {
    this.message = msg;
    setTimeout(() => {
      this.message.msg = '';
      this.message.success = false;
    }, 3000);
  }
}
