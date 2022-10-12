import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import StorageHelper from '../helpers/storage.helpers';
import { ApiService } from 'src/app/service/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public apiService: ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    
    let originalRequest = request;
    if (request.url.includes("/mirror/")) {
      console.log(StorageHelper.getItem('session'))      
      request=request.clone({
        setHeaders:{
          Authorization: "Bearer " +StorageHelper.getItem('session').token
        }
      })
      return next.handle(request).pipe(
        
        catchError((err) => {                    
          if(err.status === 401) {
            return this.expiredToken(originalRequest,next)
          }
          return (err);        
        })
        
      )
    }
    return next.handle(request);
  }


  private expiredToken(originalRequest:HttpRequest<unknown>, next:HttpHandler){
    return this.apiService.refreshToken().pipe(
      switchMap((res) =>{
        StorageHelper.setItem('session', res)
        originalRequest = originalRequest.clone({
          setHeaders:{
            Authorization: "Bearer " +StorageHelper.getItem('session').token
          }
        })
        return next.handle(originalRequest)
      })
    );
  }
}
