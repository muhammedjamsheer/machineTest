import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenicationService } from '../_service/authenication.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenicationService) { }

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.access_token) {
      var token = currentUser.access_token;
    }
    if (!token) {
      return next.handle(httpRequest);
    }

    const req1 = httpRequest.clone({
      headers: httpRequest.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1);
  }
}
