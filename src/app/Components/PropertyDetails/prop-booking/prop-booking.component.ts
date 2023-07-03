import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationService } from 'src/app/Services/Property/reservation.service';
import { ReservationDto } from 'src/app/types/ReservationDto';
import { PropertyService } from 'src/app/Services/Property/property.service';
import { PropertyBookingDto } from 'src/app/types/PropertyBookingDto';

@Component({
  selector: 'app-prop-booking',
  templateUrl: './prop-booking.component.html',
  styleUrls: ['./prop-booking.component.css']
})
export class PropBookingComponent implements OnInit {
  resDto = new ReservationDto();
  newBooking = new PropertyBookingDto;
  constructor(
    private dialogRef: MatDialogRef<PropBookingComponent>, private reservationService : ReservationService,
    public myServic:PropertyService, @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {}

  ngOnInit(): void {
    this.resDto = this.reservationService.getReservationDto();
    console.log(this.resDto.propDetails.imgs[0])
  }

  close() {
    this.dialogRef.close();
  }

  addBooking(){
    this.newBooking.CheckInDate = this.resDto.startDate;
    this.newBooking.CheckOutDate = this.resDto.endDate;
    this.newBooking.BookingDate = new Date();
    this.newBooking.NumberOfGuests = this.resDto.numOfGuests;
    this.newBooking.TotalPrice = this.resDto.totalPrice;

    this.myServic.PostPropertyBooking(this.newBooking);
  }
}
