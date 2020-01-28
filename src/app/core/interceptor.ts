import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Messages } from '../services/messages';
import { SharedService } from '../services/sharedService';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private sharedService: SharedService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const token = localStorage.getItem('token');
    let authToken = '';
    if (token) {
      authToken = 'token ' + token;
    }

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    */
    let authReq;
    if (
      req.url.match(/s3.amazonaws.com/g)
    ) {
      authReq = req.clone({ setHeaders: { 'x-auth': 'new' } });
    } else if (
      this.publicUrls(req.url)
    ) {
      authReq = req.clone({ setHeaders: { Authorization: 'ber' } });
    } else {
      authReq = req.clone({ setHeaders: { Authorization: authToken } });
    }

    // send cloned request with header to the next handler.
    return next.handle(authReq)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (
            req.url.match(/permission/g)
          ) {
            console.error('no permission');
          } else {
            this.errorHandler(req.url, error);
          }
        }
      }));
  }

  // Customize the default error handler here if needed
  private errorHandler(url: string, response: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (!this.publicUrls(url)) {
      if (response.status === 401) {
        this.sharedService.dismissAllMessages();
        this.sharedService.clearStorageAndRedirectToLogin(true);
      } else if (response.status === 403) {
        const error = (response && response.error && response.error.detail) || Messages.errors.badRequest;
        this.sharedService.showError(error);
      } else if (response.status === 400) {
        const error = (response && response.error && response.error.detail) || Messages.errors.permissionErr;
        this.sharedService.showError(error);
      } else if (response.status === 422) {
        this.sharedService.showError(Messages.errors.validationErr);
      } else if (response.status >= 500) {
        this.sharedService.showError(Messages.errors.serverErr);
      }
    }
    throw response;
  }

  private publicUrls(url: string): RegExpMatchArray {
    return url.match(/member-signup/g) ||
    url.match(/send-password-reset/g) ||
    url.match(/resetpassword/g) ||
    url.match(/company_information/g) ||
    url.match(/doc_request_portal/g) ||
    url.match(/request_portal/g) ||
    url.match(/servicedesk-varification/g) ||
    url.match(/pending_request_desk/g) ||
    url.match(/user_information/g) ||
    url.match(/resend-requestpage-link/g) ||
    url.match(/invitation_verification/g) ||
    url.match(/login/g);
  }
}
