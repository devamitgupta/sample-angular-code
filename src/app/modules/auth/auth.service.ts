import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../config/web.config';

import { Observable } from 'rxjs';
import { ILogin, ISignUp, IUser } from './auth.interface';
import { IBaseResponse } from '../../apiBaseModel/baseResponse';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(login: ILogin): Observable<IBaseResponse<IUser>> {
    return this.http.post<IBaseResponse<IUser>>(`${API_BASE_URL}api/login/`, login);
  }

  signup(token: string, login: ISignUp): Observable<IBaseResponse<any>> {
    const url = `${ API_BASE_URL }api/member-signup/${ token }/`;
    return this.http.post<IBaseResponse<IUser>>(url, login);
  }

  sendResetPassword(email: string): Observable < IBaseResponse < any >> {
    return this.http.post<IBaseResponse<any>>(`${API_BASE_URL}api/send-password-reset/${email}/`, {});
  }

  resetPassword(token: string, data): Observable < IBaseResponse < any >> {
    return this.http.post<IBaseResponse<any>>(`${API_BASE_URL}api/resetpassword/${token}/`, data);
  }

  changePassword(data) {
    return this.http.post<IBaseResponse<any>>(`${API_BASE_URL}api/user/change_password/`, data);
  }

  verifyInvite(token: string): Observable < IBaseResponse < any >> {
    return this.http.get<IBaseResponse<any>>(`${API_BASE_URL}api/invitation_verification/${token}`);
  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
      return null;
    }

    const password = control.parent.get('password');
    const confirmPassword = control.parent.get('confirmPassword') || control.parent.get('confirm_password');

    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.value === '') {
      return null;
    }

    if (password.value === confirmPassword.value) {
      return null;
    }

    return { passwordsNotMatching: true };
  }

  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }
}
