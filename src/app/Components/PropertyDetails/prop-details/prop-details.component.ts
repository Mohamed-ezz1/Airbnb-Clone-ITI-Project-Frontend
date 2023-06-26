import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/Services/Property/property.service';

@Component({
  selector: 'app-prop-details',
  templateUrl: './prop-details.component.html',
  styleUrls: ['./prop-details.component.css']
})
export class PropDetailsComponent implements OnInit {
  propDetails: any;
  constructor(private propService: PropertyService) {}

  ngOnInit(): void {
    this.propService.GetPropertyById().subscribe({
      next: (data) => { this.propDetails = data; console.log(data) },
      error: (error) => { console.log(error) },
      complete: () => { console.log("complete")}
    })
  }
}
