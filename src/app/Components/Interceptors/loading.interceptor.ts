import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from 'src/app/Services/Spinner/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busySevice : BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busySevice.busy()
    return next.handle(request).pipe(
      delay (500),
      finalize(()=> this.busySevice.idel())
    );
  }
}
