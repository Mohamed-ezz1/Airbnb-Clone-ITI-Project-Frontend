import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs';
import { HostService } from 'src/app/Services/Host/host.service';
import { PropertyService } from 'src/app/Services/Property/property.service';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { UsertypeService } from 'src/app/Services/UserType/usertype.service';
import { QueryService } from 'src/app/Services/query/query.service';
import { TabsService } from 'src/app/Services/tabs/tabs.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent {
  Property: any;
  ID: any;
  ///cahnge\\\
  PropertyFilter: any;
  objectFilter: any;
  constructor(private myRoute: ActivatedRoute,
    private query: QueryService, private PropertyService: PropertyService,
    private router: Router, private toastr: ToastrService,
    private usertype: UsertypeService, private hostservice: HostService, private TabsService:TabsService) {
    this.ID = myRoute.snapshot.params['id'];
    console.log(this.ID)
    this.TabsService.tab$.next("Home")
    //     if(this.ID == null ){
    //       console.log("null oarams")
    //     }
    //     else{
    //       console.log(this.ID)
    //     }
  }

  jedi(id: string) {
    console.log(id)
    this.router.navigateByUrl("propertyDetails/" + id)
  }

  ngOnInit(): void {

if (this.router.url=="/Property/filter"){
  console.log("ha ha ha ha ha ha ha ha ");
}else{
  console.log("lalalalalalal")
}


    this.PropertyService.GetAllPorperty().subscribe({
      next: (data) => {
        this.Property = data;
      },
      error: () => console.log("Asdasdsadsa")


    });
    ///////////

    if (this.query.query.value !== null) {
      console.log(this.query.query)
      this.query.query$.subscribe({

        next: (value) => {

          console.log(this.query.query)
          this.objectFilter = this.query.query;
          console.log("object seacrcgggg");
          this.search();
        },
        error: () => console.log("Asdasdsadsa")
      });

    }
  }



  search() {
    this.PropertyService.GetPropertySarch(this.objectFilter).subscribe({
      next: (data) => {

        console.log("kokkokokokooko")
        console.log(data)
        console.log("////////////////////")


        this.PropertyFilter = data;
      },
      error: (e) => {
console.log("momomomomomomomomomo")
        console.log(this.objectFilter)

       // this.router.navigateByUrl('Property')

        this.toastr.warning("No Data Match")



        console.log(e)
      }


    });

  }


  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }
}
