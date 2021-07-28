import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { of, Observable, throwError } from 'rxjs';
import { catchError, finalize, retry, tap, share } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class httpHeaderInterceptor implements HttpInterceptor {
    private cache = new Map<string, any>();

    constructor(public loaderService: LoaderService, private toastrService: ToastrService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = 'My-Token-989';
        const authReq = request.clone({
            setHeaders: { Authorization: `Bearer ${authToken}` }
        });

        if (request.method !== 'GET') {
            return next.handle(request);
        }

        const cachedResponse = this.cache.get(request.url);
        if (cachedResponse) {
            return of(cachedResponse.clone());
        } else {

            return next.handle(authReq).pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        this.cache.set(request.url, event);
                    }
                }),
                share(),
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    if (error.status !== 401) {
                        this.toastrService.error(`HTTP Error: ${request.url}`);
                    }
                    return throwError(error);
                }

                ), finalize(() => {
                    this.loaderService.isLoading.next(false);
                })
            );
        }
    }

}