import { Component } from '@angular/core';
import { UserProfile } from '../model/UserProfile';
import { UserProfileService } from '../service/user-profile.service';
import { GlobalService } from '../service/global.service';
import { SharingService } from '../service/sharing.service';
@Component({
  selector: 'app-menuprofile',
  templateUrl: './menuprofile.component.html',
  styleUrls: ['./menuprofile.component.css']
})
export class MenuprofileComponent {
  userProfile: UserProfile = {
    displayName: 'Tài khoản'
  }
  constructor(private userProfileService: UserProfileService,
    private globalService: GlobalService) {

  }

  ngOnInit(): void {
    if(this.globalService.getCookie("token")!=null){
      this.userProfileService.getProfile().subscribe((data:any)=>{
        this.userProfile = {
          displayName: data.data.profile.displayName,
          avatar: data.data.profile.avatar,
        }
      })
    }
  }

}
