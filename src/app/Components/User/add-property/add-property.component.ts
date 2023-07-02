import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/Services/Host/host.service';
import { PropertyAddEditDto } from 'src/app/types/PropertyAddEditDto';
import { NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  constructor(private hostService: HostService) { }

  private listsData: any;
  selectedCity = "";
  selectedCountry = "";
  selectedCategory = "";
  selectedAmenities: number[] = [];
  cities: any[] = [];
  countries: any[] = [];
  categories: any[] = [];
  amenities: any[] = [];

  property: PropertyAddEditDto = new PropertyAddEditDto();

  ngOnInit(): void {
    this.populateListsData();
  }

  populateListsData(): void {
    this.hostService.GetDataToPopulateFormLists().subscribe({
      next: (data) => {
        this.listsData = data;
        this.countries = this.listsData.countries;
        this.categories = this.listsData.categories;
        this.amenities = this.listsData.amenities.map((amenity: any) => ({
          id: amenity.id,
          name: amenity.name
        }));

        console.log("Amenities:", this.amenities); // Log the retrieved amenities
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Get list data completed successfully");
      }
    });
  }


  onCountryChange(): void {
    const selectedCountry = this.listsData.countries.find((country: any) => country.id === +this.selectedCountry);
    this.cities = selectedCountry ? selectedCountry.cities : [];
  }

  onAmenitySelectionChange(event: MatSelectChange): void {
    // Retrieve the selected options
    const selectedOptions = event.value;

    // Update the selected amenities array
    this.selectedAmenities = selectedOptions;

    // Log the selected amenity IDs
    console.log("Selected Amenities:", this.selectedAmenities);
  }

  addProperty(propertyForm: NgForm): void {
    if (propertyForm.invalid) {
      return;
    }

    this.property.propertyName = this.property.propertyName.trim();
    this.property.MaxNumberOfGuests = +this.property.MaxNumberOfGuests;
    this.property.BedroomsCount = +this.property.BedroomsCount;
    this.property.BathroomsCount = +this.property.BathroomsCount;
    this.property.BedCount = +this.property.BedCount;
    this.property.PricePerNight = +this.property.PricePerNight;
    this.property.CategoryId = +this.selectedCategory;
    this.property.CityId = +this.selectedCity;
    this.property.Address = this.property.Address.trim();
    this.property.Description = this.property.Description.trim();
    this.property.AmenitiesId = this.selectedAmenities;

    console.log("Selected Amenities:", this.property.AmenitiesId); // Log the selected amenity IDs

    this.hostService.AddProperty(this.property).subscribe(
      () => {
        console.log("Property added successfully");
      },
      (error) => {
        console.log("Error adding property:", error);
      }
    );
  }

}
