import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/UserProfile/profile.service';
import { GestProfile } from 'src/app/types/ProfileOfUser';
import { TabsService } from 'src/app/Services/tabs/tabs.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  userProfile: any = {};

  constructor(private profileService: ProfileService,
    private tabService: TabsService,


  ) {
    this.tabService.tab$.next("User")
  }

  ngOnInit() {

    this.profileService.getUserProfile()
      .subscribe({
        next: (data) => {
          if (data) {
            this.userProfile = data;
            console.log("next")
            console.log(this.userProfile)
          }
          this.userProfile = data
        },
        error: (error) => { console.log("error") }

      })
  }
}
