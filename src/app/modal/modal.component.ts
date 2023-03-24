import { Component } from '@angular/core';
import { SignInReq } from '../model/SignInReq';
import { GlobalService } from '../service/global.service';
import { UserProfileService } from '../service/user-profile.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent {
  signInReq: SignInReq = {};

  constructor(
    private userProfileService: UserProfileService, 
    private globalService: GlobalService){
  }

  handleLogin(): void {
    this.userProfileService.signIn(this.signInReq).subscribe(data =>{
      console.log(data);
      this.globalService.setCookie("token",data.data.signIn.authToken,2);
      alert("Đăng nhập thành công")
      window.location.assign("http://localhost:4200/profile");
    },err=>{
      alert("Đăng nhập thất bại")
      console.log(err);
    }
    )
  }
}
