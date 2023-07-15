import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/Services/Property/property.service';
import { MaterialModule } from 'src/app/AngularMaterial/material.module'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PropBookingComponent } from 'src/app/Components/PropertyDetails/prop-booking/prop-booking.component';
import { ReservationService } from 'src/app/Services/Property/reservation.service';
import { ReservationDto } from 'src/app/types/ReservationDto';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { TabsService } from 'src/app/Services/tabs/tabs.service';
import { postReviewDto } from 'src/app/types/postReviewDto';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-prop-details',
  templateUrl: './prop-details.component.html',
  styleUrls: ['./prop-details.component.css'],

})
export class PropDetailsComponent implements OnInit {

  postRevDto = new postReviewDto;
  sendReview():void{
    this.postRevDto.bookingId = this.propReview.bookingid;
    this.postRevDto.propertyId = this.propId;
    this.postRevDto.comment = this.comment;
    this.postRevDto.rate = this.rate;
    this.propService.postReview(this.postRevDto).subscribe(()=>{
      console.log("review posted");
      this.myRouter.navigate(['/Property}}']);
        this.snackBar.open('Review posted successfully!', 'Ok', {
          duration: 4000, // Duration in milliseconds
          verticalPosition: "top",
        });
    },
    ()=>{
      console.log("review error");
      console.log(this.rate)
    })
  }

  propDetails: any;             //all details of property
  propId: any;                      //Id of property
  pricePerNight!: any;              //price
  numOfGuests: any = 1;         // number of guests the user reserving
  isPDisabled!: boolean;
  isMDisabled: boolean = true;
  minDate = new Date();         //now date
  startDate: any;               //start date of reservation
  endDate: any;                 //end date of reservation
  numOfNights: any;             //number of nights the user reserving
  totalPrice: any;             //total price of booking
  minCheckOutDate: any;
  maxCheckOutDate: any;
  range!: FormGroup;
  bookingIdOfThisUser: any;
  propReview : any;
  comment: any;
  rate:any = 1;

myFilter = (date: Date | null): boolean => {        //filter of check in date
  if (!date) {
    return false;
  }
  const timestamp = date.toLocaleDateString();
  for (const booking of this.propDetails.bookingDates) {
    const checkIn = new Date(booking.checkInDate).toLocaleDateString();
    const checkOut = new Date(booking.checkOutDate).toLocaleDateString();
    if (timestamp >= checkIn && timestamp <= checkOut) {
      return false;
    }
  }
  return true;
};

onCheckInDateChange() {
  const nextBooking = this.getNextBooking(this.startDate);
  this.minCheckOutDate = new Date(this.startDate);
  this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1);
  this.maxCheckOutDate = nextBooking ? new Date(nextBooking.checkInDate) : null;
}

getNextBooking(checkInDate: Date): { checkInDate: string, checkOutDate: string } {
  // Find the next available booking after the given check-in date
  const timestamp = checkInDate.getTime();
  const bookings = this.propDetails.bookingDates.filter((booking: { checkInDate: string | number | Date; }) => new Date(booking.checkInDate).getTime() > timestamp);
  return bookings.length > 0 ? bookings[0] : null;
}

onDateRangeChange() {
  console.log(this.startDate)
  const differenceInMs = this.endDate.getTime() - this.startDate.getTime();
  this.numOfNights = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  this.totalPrice = (this.numOfNights) * (this.propDetails.pricePerNight);
}

  constructor(myRoute: ActivatedRoute, private propService: PropertyService, public myRouter: Router,
    public fb: FormBuilder,private tabService: TabsService, private authService: AuthenticationService, private dateAdapter: DateAdapter<Date>,
    private dialog: MatDialog, private snackBar: MatSnackBar, private reservationService: ReservationService) {
      this.dateAdapter.setLocale('en-GB');
    this.propId = myRoute.snapshot.params["id"];
    this.range = this.fb.group({
      start: null,
      end: null
    });
  }

  ngOnInit(): void {
    this.tabService.tab$.next("User");
    this.propService.GetPropertyById(this.propId).subscribe({
      next: (data) => { this.propDetails = data; console.log(data); },
      error: (error) => { console.log(error) },
      complete: () => { console.log("complete"); }
    });

    this.propService.CheckForReviews(this.propId).subscribe({
      next: (data) => { this.propReview = data;

        console.log("cheeeeeeeeeeeeeeee");
        console.log(data);


      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("complete"); }
    });
  }


  // plus button function
  pButton() {
    if (this.numOfGuests < this.propDetails.maxNumOfGuest) {
      this.numOfGuests += 1;
      this.isMDisabled = false;
      if (this.numOfGuests == this.propDetails.maxNumOfGuest) {
        this.isPDisabled = true;
      }
    }else if (this.numOfGuests == this.propDetails.maxNumOfGuest) {
      this.isPDisabled = true;
    }
  }

  // minus button function
  mButton() {
    if (this.numOfGuests > 1) {
      this.numOfGuests -= 1;
      this.isPDisabled = false;
      if (this.numOfGuests == 1) {
        this.isMDisabled = true;
      }
    }
  }

  openPopup() {
    if (this.authService.isLoggedIn$.value) {
      if (this.startDate == null || this.endDate == null) {
        this.snackBar.open('Please select a reservation range first!', 'Close', {
          duration: 4000, // Duration in milliseconds
          verticalPosition: "top",
        });
      } else
        this.dialog.open(PropBookingComponent, {
          data: {
            title: 'Popup Title',
            message: 'Popup message'
          }
        });
      var resDto = new ReservationDto();
      resDto.numOfGuests = this.numOfGuests;
      resDto.pricePerNight = this.pricePerNight;
      resDto.StartDate = this.startDate;
      resDto.EndDate = this.endDate;
      resDto.numOfNights = this.numOfNights;
      resDto.totalPrice = this.totalPrice;
      resDto.propDetails = this.propDetails;
      resDto.propId = this.propId;
      this.reservationService.setReservationDto(resDto);
    } else if (this.startDate == null || this.endDate == null) {
      this.snackBar.open('Please select a reservation range first!', 'Close', {
        duration: 4000, // Duration in milliseconds
        verticalPosition: "top",
      });
    }
    else {
      this.myRouter.navigate(['/login']);
      this.snackBar.open('Please login first!', 'Close', {
        duration: 4000, // Duration in milliseconds
        verticalPosition: "top",
      });
    }
  }
}

