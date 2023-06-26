import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/Services/Host/host.service';
import { PropertyAddEditDto } from 'src/app/types/PropertyAddEditDto';

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
        this.amenities = this.listsData.amenities;
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

  addProperty(): void {
    this.property.propertyName = ""; // Assign the value from your form control
    this.property.ImagesURLs = []; // Assign the value from your form control
    this.property.MaxNumberOfGuests = 0; // Assign the value from your form control
    this.property.BedroomsCount = 0; // Assign the value from your form control
    this.property.BathroomsCount = 0; // Assign the value from your form control
    this.property.BedCount = 0; // Assign the value from your form control
    this.property.PricePerNight = 0; // Assign the value from your form control
    this.property.CategoryId = +this.selectedCategory;
    this.property.CityId = +this.selectedCity;
    this.property.Address = ""; // Assign the value from your form control
    this.property.Description = ""; // Assign the value from your form control
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
