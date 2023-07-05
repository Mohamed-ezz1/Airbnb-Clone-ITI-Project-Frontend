import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/UserProfile/profile.service';
import { GestProfile } from 'src/app/types/ProfileOfUser';
import { TabsService } from 'src/app/Services/tabs/tabs.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  userProfile: any = {};

  constructor(private profileService: ProfileService,
    private tabService: TabsService,
  private route: Router
    ) { }

  ngOnInit() {
    this.tabService.tab$.next(this.route.url)

    this.profileService.getUserProfile()
      .subscribe({
        next: (data) => {
          if (data) {
            this.userProfile = data;
          }
          this.userProfile = data
        },
        error: (error) => { console.log("error") }

      })
  }
}
