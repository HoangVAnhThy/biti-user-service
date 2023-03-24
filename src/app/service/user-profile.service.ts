import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInReq } from '../model/SignInReq';
import { UserProfile } from '../model/UserProfile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient,
    private globalService: GlobalService) { }

  payload:any 
  signIn(signInReq: SignInReq):Observable<any>{
    return this.http.post<any>('http://51.79.255.60:9000/authorize/sign-in',signInReq);
  }


  getProfile():Observable<any>{
    if(this.globalService.getCookie("token")!=null){
      this.payload = this.globalService.parseJwt(this.globalService.getCookie("token"));
    }
    return this.http.get<any>('http://localhost:9090/api/profile/'+this.payload.sub,{
      headers: new HttpHeaders().set('Authorization', "Bearer " +this.globalService.getCookie("token"))
    });
  }

  getCart():Observable<any>{
    if(this.globalService.getCookie("token")!=null){
      this.payload = this.globalService.parseJwt(this.globalService.getCookie("token"));
      
    }
    return this.http.get<any>('http://localhost:9090/api/cart/'+this.payload.sub,{
      headers: new HttpHeaders().set('Authorization', "Bearer " +this.globalService.getCookie("token"))
    });
  }

  deleteCart(productId:any):Observable<any>{
    return this.http.delete<any>('http://localhost:9090/api/cart/delete/'+this.payload.sub+'/'+productId,{
      headers: new HttpHeaders().set('Authorization', "Bearer " +this.globalService.getCookie("token"))
    });
  }
}
