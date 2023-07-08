import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HostService } from 'src/app/Services/Host/host.service';
import { UserProfileUpdateService } from 'src/app/Services/UserProfileUpdate/user-profile-update.service';
import { GestToUpdateProfile } from 'src/app/types/ProfileOfUserDTO';
import { TabsService } from 'src/app/Services/tabs/tabs.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css']
})
export class UserProfileUpdateComponent implements OnInit {
  userProfile: any = {};

  ImageUrl = '';

  constructor(private userService: UserProfileUpdateService,
    private imageService: HostService,
    private route: Router,
    private snackBar: MatSnackBar,
    private tabService: TabsService
    ) { this.tabService.tab$.next("User")
  }

  ngOnInit(): void {
    console.log("onInit")

    this.userService.getUserProfile().subscribe({
      next: (Profile) => {
        this.userProfile = Profile;
        console.log("next")
        console.log(this.userProfile)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  uploadPhoto(e: Event) {
    const input = e.target as HTMLInputElement  //cast the target to html input element
    const file = input.files?.[0]
    if (!file) return;
    this.imageService.Upload(file).subscribe(response => {
      this.ImageUrl = response.url;
      console.log(response)
      this.userProfile.url = this.ImageUrl
    })
  }

  onUpdateUserProfile(form: NgForm): void {
    if (form.invalid) {
      return; // Do not submit the form if it's invalid
    }
    console.log("after valid ")
    this.userService.updateUserProfile(this.userProfile).subscribe({
      next: (profile: any) => {
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 4000,
          verticalPosition: "top",
        });
        this.route.navigate(['user-profile'])
      },
      error: (error) => {
        console.error(error);
        alert('Something went wrong. Please try again later.');
      }
    });
  }

}
