import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/Services/Host/host.service';
import { PropertyAddEditDto } from 'src/app/types/PropertyAddEditDto';
import { NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImagePopupComponent } from '../image-popup/image-popup.component';
import { HostDashboardComponent } from '../host-dashboard/host-dashboard.component';
import { UsertypeService } from 'src/app/Services/UserType/usertype.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  constructor(private hostService: HostService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private hostDashboard: HostDashboardComponent,
    private usertype: UsertypeService,
    private hostservice: HostService) {

  }

  // ImageUrl = '';
  ImageUrls: string[] = [];

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



  uploadPhotos(e: Event) {
    const input = e.target as HTMLInputElement;
    const files = Array.prototype.slice.call(input.files) as File[];
    if (files.length === 0) return;

    const uploadObservables = files.map((file) => {
      return this.hostService.Upload(file);
    });

    // Use forkJoin to join the response from the backend
    forkJoin(uploadObservables).subscribe(
      (responses) => {
        console.log(responses);
        // Extract the 'url' property from each response object and assign to ImageUrls
        this.ImageUrls = responses.map((response) => response.url);
        console.log(this.ImageUrls);
      },
      (error) => {
        console.log("Error uploading photos:", error);

        // Display the error message from the backend in the snackbar
        this.snackBar.open(error.error.message, "Close", {
          duration: 4000,
          verticalPosition: "top",
        });
      }
    );
  }


  openImagePopup(): void {
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      data: { imageUrls: this.ImageUrls },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }



  addProperty(propertyForm: NgForm): void {
    if (propertyForm.invalid) {
      return;
    }
    // Trim whitespace from property name and address
    this.property.propertyName = this.property.propertyName.trim();
    this.property.Address = this.property.Address.trim();
    // Convert number fields to numbers
    this.property.MaxNumberOfGuests = +this.property.MaxNumberOfGuests;
    this.property.BedroomsCount = +this.property.BedroomsCount;
    this.property.BathroomsCount = +this.property.BathroomsCount;
    this.property.BedCount = +this.property.BedCount;
    this.property.PricePerNight = +this.property.PricePerNight;
    this.property.CategoryId = +this.selectedCategory;
    this.property.CityId = +this.selectedCity;
    this.property.AmenitiesId = this.selectedAmenities
    // Set the ImagesURLs property of the Property object to the ImageUrls array
    this.property.ImagesURLs = this.ImageUrls;
    // Add the property using the hostService
    this.hostService.AddProperty(this.property).subscribe(
      () => {
        console.log("Property added successfully");
        // this.hostService.isHost$.next(true);
        // Navigate to the Host Property tab in the dashboard
        this.hostDashboard.toggleHostProperty();
        // Show snackbar message
        this.snackBar.open('Property added successfully', 'Close', {
          duration: 4000, // Duration in milliseconds
          verticalPosition: "top",
        });
      },
      (error) => {
        console.log("Error adding property:", error);
      }
    );
  }
}
