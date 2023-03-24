import { Component, OnInit, ElementRef,ViewChild, AfterViewInit} from '@angular/core';
import { UserProfile } from '../model/UserProfile';
import { GlobalService } from '../service/global.service';
import { UserProfileService } from '../service/user-profile.service';
import { BirthdayProfile } from '../model/BirthdayProfile';
import { DomSanitizer } from '@angular/platform-browser';
import { SharingService } from '../service/sharing.service';

@Component({
  selector: 'app-profileform',
  templateUrl: './profileform.component.html',
  styleUrls: ['./profileform.component.css']
})
export class ProfileformComponent implements OnInit,AfterViewInit {
  userProfile: UserProfile = {};
  birthdayProfile: BirthdayProfile ={};
  previousDay: any;
  // For hold data to convert date
  date: any;
  month:any;
  avatarImg: any;
  @ViewChild('month') monthSelect?:ElementRef;
  @ViewChild('day') daySelect?:ElementRef;
  @ViewChild('year') yearSelect?:ElementRef;



  constructor(private userProfileService: UserProfileService,
    private globalService: GlobalService,
    private elementRef:ElementRef,
    private sanitizer: DomSanitizer) {
  }

  ngAfterViewInit(): void {
    //View upload image
    const input = this.elementRef.nativeElement.querySelector('.upload-btn');
    input.addEventListener('change',()=>{
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        this.avatarImg = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(files[i]));
      }
    })
  }

  handleUploadBtnClick(){
    const input = this.elementRef.nativeElement.querySelector('.upload-btn');
    input.click();
  }


  
  populateDays(month:any){
    // Delete All option dropdown if they do exist
    while(this.daySelect?.nativeElement.firstChild){
      this.daySelect.nativeElement.removeChild(this.daySelect.nativeElement.firstChild);
    }

    let dayNum: any;

    let year = this.yearSelect?.nativeElement.value;
    // Check Month
    if(month =='1'|| month =='3'|| month =='5' || month=='7'|| month=='8' || month =='10' || month=='12'){
      dayNum = 31;
    }
    else if(month =='4'|| month =='6'|| month =='9' || month =='11'){
      dayNum = 30;
    }
    else{
        //Check for a year leap
        if(new Date(year,1,29).getMonth() == 1) {
          dayNum = 29;
        }
        else{
          dayNum = 28;
        }
    }
    // Loop for insert option day into day <select>
    for(let i:any =1; i <= dayNum; i++){
      this.daySelect?.nativeElement.insertAdjacentHTML('beforeend','<option value="'+i+'">'+i+'</option>')
      //Select previous value
      if( i == this.birthdayProfile.day){
        this.daySelect?.nativeElement.insertAdjacentHTML('beforeend','<option selected value="'+i+'">'+i+'</option>')
      }
    }
  }

  populateYears(){
    // Get the current year
    let year = new Date().getFullYear();
    // Make the previous 100 year be an option
    for(let i:any = 0; i < 101; i ++){
      this.yearSelect?.nativeElement.insertAdjacentHTML('beforeend','<option value="'+(year-i)+'">'+(year-i)+'</option>');
    }
  }


  ngOnInit(): void {
    // Fetch API profile
    if(this.globalService.getCookie("token")!=null){
      this.userProfileService.getProfile().subscribe((data:any)=>{
        this.userProfile = {
          id: data.data.profile.id,
          displayName: data.data.profile.displayName,
          avatar: data.data.profile.avatar,
          phone: data.data.profile.phone,
          email: data.data.profile.user.email,
          birthday: data.data.profile.birthday,
          gender: data.data.profile.gender
        }
        this.date = this.userProfile.birthday?.toString();
        this.avatarImg = data.data.profile.avatar;
        let birth = new Date(this.date);
        this.birthdayProfile = {
          day: birth.getDate(),
          month: birth.getMonth(),
          year: birth.getFullYear()
        }
        this.previousDay = birth.getDate();
        // Date dropdown picker render view
        this.populateDays(this.birthdayProfile.month);
        this.populateYears();
      })
    }
  }



}
