import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/Services/Property/property.service';
import { MaterialModule } from 'src/app/AngularMaterial/material.module'
import { MatCalendar } from '@angular/material/datepicker';
import { FormGroup, FormControl, FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-prop-details',
  templateUrl: './prop-details.component.html',
  styleUrls: ['./prop-details.component.css'],
  
})
export class PropDetailsComponent implements OnInit {

  propDetails: any;
  ID:any;
  totalPrice: any;
  numOfNights: any;
  range!: FormGroup;
  // range: FormGroup = new FormGroup
  // ({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });
  constructor(myRoute:ActivatedRoute,private propService: PropertyService, private fb: FormBuilder) {
    this.ID=myRoute.snapshot.params["id"];
    this.range = this.fb.group({
      start: null,
      end: null
    });
  }


  dateFilter = (date: Date): boolean => {
    const startDate = new Date(2023, 7, 1); // July 1, 2023
    const endDate = new Date(2023, 7, 15); // July 15, 2023
    const dd = Date.now();
    return date >= startDate && date <= endDate;
  }


  ngOnInit(): void {
    this.propService.GetPropertyById(this.ID).subscribe({
      next: (data) => { this.propDetails = data; console.log(data); },
      error: (error) => { console.log(error) },
      complete: () => { console.log("complete");}
    })
  }

    
  // hh() {
  //   const startDate = this.range.get('start')?.value;
  //   const endDate = this.range.get('end')?.value;
  //   console.log(startDate);
  //   console.log(endDate);
  //   // Do something with the selected date range

}

