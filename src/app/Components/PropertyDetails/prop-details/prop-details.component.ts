import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/Services/Property/property.service';
import { MaterialModule } from 'src/app/AngularMaterial/material.module'
import { MatDatepickerInputEvent  } from '@angular/material/datepicker';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PropBookingComponent } from 'src/app/Components/PropertyDetails/prop-booking/prop-booking.component';
import { ReservationService } from 'src/app/Services/Property/reservation.service';
import { ReservationDto } from 'src/app/types/ReservationDto';

@Component({
  selector: 'app-prop-details',
  templateUrl: './prop-details.component.html',
  styleUrls: ['./prop-details.component.css'],

})
export class PropDetailsComponent implements OnInit {

  propDetails: any;             //all details of property
  ID: any;                      //Id of property 
  pricePerNight!: any; 
  numOfGuests: any = 2;         // number of guests the user reserving
  isPDisabled!: boolean;        
  isMDisabled!: boolean;
  minDate = new Date();         //now date
  startDate: any;               //start date of reservation
  endDate: any;                 //end date of reservation
  numOfNights: any;             //number of nights the user reserving
  totalPrice: any;             //total price of booking
  range!: FormGroup;
 
  

  
  constructor(myRoute: ActivatedRoute, private propService: PropertyService, public myRouter:Router,
     private fb: FormBuilder, private dialog: MatDialog, private reservationService : ReservationService) {

    this.ID = myRoute.snapshot.params["id"];
    this.range = this.fb.group({
      start: null,
      end: null
    });
  }

  ngOnInit(): void {
    this.propService.GetPropertyById(this.ID).subscribe({
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
      console.log(this.numOfGuests)
      if (this.numOfGuests == this.propDetails.maxNumOfGuest) {
        this.isPDisabled = true;
      }
    }
  }

  // minus button function
  mButton() {
    if (this.numOfGuests > 1) {
      this.numOfGuests -= 1;
      this.isPDisabled = false;
      console.log(this.numOfGuests)
      if (this.numOfGuests == 1) {
        this.isMDisabled = true;
      }
    }
  }

  onDateChange() {
    console.log('hhh');
  }

  openPopup() {
    this.dialog.open(PropBookingComponent, {
      data: {
        title: 'Popup Title',
       message: 'Popup message'
      }
    });
    var resDto = new ReservationDto();
    resDto.numOfGuests = this.numOfGuests;
    resDto.pricePerNight = this.pricePerNight;
    resDto.startDate = this.startDate;
    resDto.endDate = this.endDate;
    this.numOfNights = (this.endDate.getDate())-(this.startDate.getDate());
    resDto.numOfNights = this.numOfNights;
    this.totalPrice = (this.numOfNights) * (this.propDetails.pricePerNight);
    resDto.totalPrice = this.totalPrice;
    resDto.propDetails = this.propDetails;
    this.reservationService.setReservationDto(resDto);
  }

}

