import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
   Property!: any;
  query: QueryService
  PropertyService : PropertyService
  constructor(query: QueryService,PropertyService : PropertyService   ,  private router: Router) {
    this.query = query;
    this.PropertyService = PropertyService
    

  }

  ngOnInit(): void {

    this.PropertyService.GetAllPorperty().subscribe({
      next: (data)=>{
        this.Property = data;
        console.log(this.Property)

      },
      error: ()=> console.log("Asdasdsadsa") 
      
      
          });
      
///////

    this.query.query$.subscribe({
      
      next: (value)=>{

        console.log(this.query.query    )

      },
      error: ()=> console.log("Asdasdsadsa") 
    });

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
