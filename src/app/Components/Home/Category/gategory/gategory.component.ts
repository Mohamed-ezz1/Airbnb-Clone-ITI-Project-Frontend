import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { GtegoryDto } from 'src/app/types/Gategory';
import { MatIcon } from '@angular/material/icon';
import { TabsService } from 'src/app/Services/tabs/tabs.service';

@Component({
  selector: 'app-gategory',
  templateUrl: './gategory.component.html',
  styleUrls: ['./gategory.component.css']
})
export class GategoryComponent {
  @ViewChild('elFilter') elFilter: any
  ishome:any
  constructor(private route : Router, private  stayService : CategoryService ,TabsService:TabsService) {
    TabsService.tab$.subscribe({

      next: (data)=>{
  
        if(data=="Home"){
          this.ishome=true}
          else{
            this.ishome=false
          }
        }
      }
     )
   }

 // filters = filters  // data
  
  isFullyScrolledRight: boolean = false
  isFullyScrolledLeft: boolean = false
  stayFilter !: GtegoryDto
  subscription!: Subscription
category!: GtegoryDto[];
  ngOnInit(): void {
    this.subscription = this.stayService.GetAllGategory().subscribe(stayFilter => {
      this.category = stayFilter
    })
  }

  onScroll(direction: number): void {
    if (this.elFilter.nativeElement) {
      this.elFilter.nativeElement.scrollLeft += 500 * direction
        this.calcIsFullyScrolled()
    }
  }

  calcIsFullyScrolled() {

    const calc = Math.ceil(this.elFilter.nativeElement?.scrollLeft) - Math.ceil(this.elFilter.nativeElement?.scrollWidth - this.elFilter.nativeElement?.clientWidth)

    if (this.elFilter.nativeElement) {
      this.isFullyScrolledRight = Math.abs(calc) <= 1
      this.isFullyScrolledLeft = this.elFilter.nativeElement?.scrollLeft === 0
      
    }
  }

  redirectTo() {
    this.route.navigateByUrl('Property', { skipLocationChange: true }).then(() =>
    this.route.navigateByUrl('Property/2')  );
  }
  onClickLabel(label: number): void {
   // this.stayFilter.label = label
    console.log(label)
    this.stayService.setqeury(label);
     this.redirectTo()
   // this.stayService.setFilter({ ...this.stayFilter })
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe()
  // }
}
