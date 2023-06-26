import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/Services/Host/host.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  constructor(private populateListsData: HostService) { }

  private ListsData: any;
  selectedCity = "";
  selectedCountry = "";
  selectedCategory = "";
  selectedAmenities: string[] = [];
  cities: any[] = [];
  countries: any[] = [];
  categories: any[] = [];
  amenities: any[] = [];

  ngOnInit(): void {
    this.populateListsData.GetDataToPopulateFormLists().subscribe({
      next: (data) => {
        this.ListsData = data;
        this.countries = this.ListsData.countries;
        this.categories = this.ListsData.categories;
        this.amenities = this.ListsData.amenities;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Get List data completed successfully");
      }
    });
  }

  onCountryChange() {
    const selectedCountry = this.ListsData.countries.find((country: any) => country.id === +this.selectedCountry);
    this.cities = selectedCountry ? selectedCountry.cities : [];
  }
}
