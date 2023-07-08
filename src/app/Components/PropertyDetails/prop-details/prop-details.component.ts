import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-prop-details',
  templateUrl: './prop-details.component.html',
  styleUrls: ['./prop-details.component.css'],

})
export class PropDetailsComponent implements OnInit {

  propDetails: any;             //all details of property
  propId: any;                      //Id of property
  pricePerNight!: any;              //priceeeeeeee
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

  myFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const timestamp = date.getTime();
    for (const booking of this.propDetails.bookingDates) {
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      checkOut.setDate(checkOut.getDate()); // Add one day to the check-out date
      if (timestamp >= checkIn.getTime() && timestamp < checkOut.getTime()) {
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
    const differenceInMs = this.endDate.getTime() - this.startDate.getTime();
    this.numOfNights = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    this.totalPrice = (this.numOfNights) * (this.propDetails.pricePerNight);
  }

  constructor(myRoute: ActivatedRoute, private propService: PropertyService, public myRouter: Router,
    public fb: FormBuilder, private tabService: TabsService, private authService: AuthenticationService, private dateAdapter: DateAdapter<Date>,
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
    })
  }


  // plus button function
  pButton() {
    if (this.numOfGuests < this.propDetails.maxNumOfGuest) {
      this.numOfGuests += 1;
      this.isMDisabled = false;
      if (this.numOfGuests == this.propDetails.maxNumOfGuest) {
        this.isPDisabled = true;
      }
    } else if (this.numOfGuests == this.propDetails.maxNumOfGuest) {
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
      console.log(resDto.StartDate)
      resDto.EndDate = this.endDate;
      console.log(resDto.EndDate)
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

