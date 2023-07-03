import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationService } from 'src/app/Services/Property/reservation.service';
import { ReservationDto } from 'src/app/types/ReservationDto';

@Component({
  selector: 'app-prop-booking',
  templateUrl: './prop-booking.component.html',
  styleUrls: ['./prop-booking.component.css']
})
export class PropBookingComponent implements OnInit {
  resDto = new ReservationDto();
  constructor(
    private dialogRef: MatDialogRef<PropBookingComponent>, private reservationService : ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {}

  ngOnInit(): void {
    this.resDto = this.reservationService.getReservationDto();
  }

  close() {
    this.dialogRef.close();
  }
}
