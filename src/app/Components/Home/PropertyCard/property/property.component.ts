import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs';
import { PropertyService } from 'src/app/Services/Property/property.service';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { QueryService } from 'src/app/Services/query/query.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent {
  Property: any;
  ID  = null;
///cahnge\\\
  PropertyFilter: any;
  objectFilter: any;
  query: QueryService
  PropertyService: PropertyService
  constructor( private myRoute: ActivatedRoute, query: QueryService, PropertyService: PropertyService, private router: Router ,private toastr: ToastrService) {
    this.ID = myRoute.snapshot.params['id'];
    // if(this.ID == null ){
    //   console.log("null oarams")
    // }
    // else{
    //   console.log(this.ID) 
    // }
// console.log(myRoute.snapshot)
    this.query = query;
    this.PropertyService = PropertyService
  }

  ngOnInit(): void {

    this.PropertyService.GetAllPorperty().subscribe({
      next: (data) => {
        this.Property = data;
      },
      error: () => console.log("Asdasdsadsa")


    });



    ///////

    this.query.query$.subscribe({

      next: (value) => {

        console.log(this.query.query)
        this.objectFilter = this.query.query;

      },
      error: () => console.log("Asdasdsadsa")
    });




    ///////////////

    this.PropertyService.GetPropertySarch(this.objectFilter).subscribe({
      next: (data) => {
        console.log("data filter")

        console.log("//////////////////////")
        console.log(data)
        console.log("////////////////////")


        this.PropertyFilter = data;
      },
      error: (e) => {
        
        console.log(this.objectFilter)

        this.router.navigateByUrl('Property')
        this.toastr.warning("No Data Match")

        console.log(e)}


    });

    //////



  }




  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }
}
