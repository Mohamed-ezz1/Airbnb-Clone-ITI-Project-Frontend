import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-prop-booking',
  templateUrl: './prop-booking.component.html',
  styleUrls: ['./prop-booking.component.css']
})
export class PropBookingComponent {
  constructor(
    private dialogRef: MatDialogRef<PropBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
