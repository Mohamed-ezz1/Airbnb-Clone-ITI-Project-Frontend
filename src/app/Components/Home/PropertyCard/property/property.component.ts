import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
  Property: any;
  ID :any;

  PropertyFilter: any;
  objectFilter: any;
  query: QueryService
  PropertyService: PropertyService
  constructor(myRoute: ActivatedRoute, query: QueryService, PropertyService: PropertyService, private router: Router) {
    this.ID = myRoute.snapshot.params['id'];
    if(this.ID == null ){
      console.log("null oarams " )
    }
    else{
      console.log(this.ID)
    }
    
console.log(myRoute.snapshot)
    this.query = query;
    this.PropertyService = PropertyService
  }

  ngOnInit(): void {

    this.PropertyService.GetAllPorperty().subscribe({
      next: (data) => {
        this.Property = data;
        console.log(this.Property)
        console.log(this.Property[1].imgUrl)

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
        console.log(data)

        this.PropertyFilter = data;
      },
      error: () => console.log("Asdasdsadsa")


    });

    //////


    this.slides[0] = {
      src: './assets/img/angular.jpg',
    };
    this.slides[1] = {
      src: './assets/img/react.jpg',
    }
    this.slides[2] = {
      src: './assets/img/vue.jpg',
    }
  }




  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }
}
