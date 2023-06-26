import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostService } from 'src/app/Services/Host/host.service';

@Component({
  selector: 'app-host-property-update',
  templateUrl: './host-property-update.component.html',
  styleUrls: ['./host-property-update.component.css']
})
export class HostPropertyUpdateComponent {

}


  getPropertyDataById(id: any) {
    this.hostService.GetDataToPopulateForm(id).subscribe({
      next: (data) => {
        this.property = data;
        this.selectedCountry = this.property.countryId;
        this.onCountryChange(); // Update cities based on selected country
        this.selectedCity = this.property.cityId;
        this.selectedCategory = this.property.categoryId;
        this.selectedAmenities = this.property.amenities;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Property data retrieved successfully");
      }
    });
  }

  populateListsData() {
    this.hostService.GetDataToPopulateFormLists().subscribe({
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

  updateProperty() {
    const updatedProperty = {
      ...this.property,
      countryId: this.selectedCountry,
      cityId: this.selectedCity,
      categoryId: this.selectedCategory,
      amenities: this.selectedAmenities
    };

    
  }
}