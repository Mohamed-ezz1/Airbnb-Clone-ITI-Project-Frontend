import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/Services/Host/host.service';
import { PropertyAddEditDto } from 'src/app/types/PropertyAddEditDto';
import { NgForm } from '@angular/forms';

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

  toggleAmenitySelection(amenityId: number): void {
    const index = this.selectedAmenities.indexOf(amenityId);
    if (index > -1) {
      this.selectedAmenities.splice(index, 1);
    } else {
      this.selectedAmenities.push(amenityId);
    }
  }

  addProperty(propertyForm: NgForm): void {
    if (propertyForm.invalid) {
      return;
    }

    this.property.propertyName = this.property.propertyName.trim();
    this.property.ImagesURLs = this.property.ImagesURLs.map((url: string) => url.trim());
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

    this.hostService.AddProperty(this.property).subscribe(
      () => {
        console.log("Property added successfully");
        // Perform any further actions or navigate to a different page if needed
      },
      (error) => {
        console.log("Failed to add property:", error);
        // Handle the error as needed
      }
    );
  }
}
