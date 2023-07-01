import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/Services/Property/property.service';
import { MaterialModule } from 'src/app/AngularMaterial/material.module'
import { FormGroup, FormControl } from '@angular/forms';
//import { MatDatepickerFilter } from '@angular/material/datepicker';

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

  constructor(myRoute:ActivatedRoute,private propService: PropertyService) {
    this.ID=myRoute.snapshot.params["id"];
  }


  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
    this.propService.GetPropertyById(this.ID).subscribe({
      next: (data) => { this.propDetails = data; console.log(data); },
      error: (error) => { console.log(error) },
      complete: () => { console.log("complete");}
    })
  }

    
  hh() {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;
    console.log(startDate);
    console.log(endDate);
    // Do something with the selected date range
  }
  
  // dateFilter: MatDatepickerFilter<Date> = (date: Date) => {
  //   const startDate = new Date('2023-07-1');
  //   const endDate = new Date('2023-07-10');
  //   return date < startDate || date > endDate;
  // }

}

