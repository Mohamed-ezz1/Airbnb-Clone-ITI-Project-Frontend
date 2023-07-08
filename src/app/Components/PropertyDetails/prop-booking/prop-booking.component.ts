import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationService } from 'src/app/Services/Property/reservation.service';
import { ReservationDto } from 'src/app/types/ReservationDto';
import { PropertyService } from 'src/app/Services/Property/property.service';
import { PropertyBookingDto } from 'src/app/types/PropertyBookingDto';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prop-booking',
  templateUrl: './prop-booking.component.html',
  styleUrls: ['./prop-booking.component.css']
})
export class PropBookingComponent implements OnInit {
  resDto = new ReservationDto();
  newBooking = new PropertyBookingDto;
  propId: any;
  constructor(
    private dialogRef: MatDialogRef<PropBookingComponent>, private reservationService: ReservationService,
    public myServic: PropertyService, myRoute: ActivatedRoute, public myRouter: Router, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {
  }

  ngOnInit(): void {
    this.resDto = this.reservationService.getReservationDto();
    console.log(this.resDto.propDetails.imgs[0])
  }

  close() {
    this.dialogRef.close();
    console.log(this.resDto.numOfGuests)
  }

  addBooking(): void {
    // Convert dates to UTC format before sending to the back-end
    const startDate = new Date(this.resDto.StartDate);
    const endDate = new Date(this.resDto.EndDate);
    const utcStartDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
    const utcEndDate = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

    this.newBooking.StartDate = utcStartDate;
    this.newBooking.EndDate = utcEndDate;
    this.newBooking.NumOfGuest = this.resDto.numOfGuests;
    this.newBooking.PropertyId = this.resDto.propId;

    this.myServic.PostPropertyBooking(this.newBooking).subscribe(
      (next) => {
        this.myRouter.navigate(['/Property']);
        this.close();
        this.snackBar.open('Reserved successfully!', 'Ok', {
          duration: 4000, // Duration in milliseconds
          verticalPosition: "top",
        });
      },
      (error) => { console.log("Error adding booking:", error); }
    );
  }

}
