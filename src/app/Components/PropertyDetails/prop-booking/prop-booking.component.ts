import { Component, Inject, OnInit  } from '@angular/core';
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
  propId :any;
  constructor(
    private dialogRef: MatDialogRef<PropBookingComponent>, private reservationService : ReservationService,
    public myServic:PropertyService, myRoute:ActivatedRoute,public myRouter: Router, private snackBar: MatSnackBar,
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

  addBooking():void{
    this.newBooking.StartDate = this.resDto.StartDate;
    this.newBooking.EndDate = this.resDto.EndDate;
    this.newBooking.NumOfGuest = this.resDto.numOfGuests;
    this.newBooking.PropertyId = this.resDto.propId;

    this.myServic.PostPropertyBooking(this.newBooking).subscribe(
      (next)=>{ 
        this.myRouter.navigate(['/Property']);
        this.close();
        this.snackBar.open('Reserved succefully!', 'Ok', {
          duration: 4000, // Duration in milliseconds
          verticalPosition: "top",
        });
    },
    (error) => { console.log("Error adding booking:", error);}
    )
  }
}
