import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostService } from 'src/app/Services/Host/host.service';
import { PropertyAddEditDto } from 'src/app/types/PropertyAddEditDto';
import { NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { PropertyGetUpdateDto } from 'src/app/types/PropertyGetUpdateDto';
import { PropertyUpdateDto } from 'src/app/types/PropertyUpdateDto';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { imagePopUpdateComponent } from '../image-pop-update/image-pop-update.component';

@Component({
  selector: 'app-host-property-update',
  templateUrl: './host-property-update.component.html',
  styleUrls: ['./host-property-update.component.css']
})
export class HostPropertyUpdateComponent implements OnInit {
  property: PropertyAddEditDto = new PropertyAddEditDto();
  oldProperty: PropertyGetUpdateDto = new PropertyGetUpdateDto();
  snackBar: any;
  ImageUrls: any;

  constructor(
    private hostService: HostService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router
  ) { }

  private listsData: any;
  selectedCountry: string = '';
  selectedCity: string = '';

  selectedCategory = 1;
  selectedAmenities: number[] = [];
  cities: any[] = [];
  countries: any[] = [];
  categories: any[] = [];
  amenities: any[] = [];
  newImages: File[] = [];
  selectedImages: File[] = [];
  storedImages: string[] = [];
  imageUrl!: SafeUrl;

  ngOnInit(): void {
    this.populateListsData();

    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.getPropertyData(propertyId);
    }
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
        console.log('Get list data completed successfully');
      }
    });
  }

  uploadPhotos(e: Event): void {
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    // Delete selected images
    const deletedImages = Array.from(input.files || []).map(file => file.name);

    // Remove deleted images from the storedImages array
    this.storedImages = this.storedImages.filter(url => !deletedImages.includes(url));

    if (files.length === 0) {
      return;
    }

    const filesToUpload = files;
    // Upload each file and save the property data after each successful upload
    filesToUpload.forEach((file) => {
      this.hostService.Upload(file).subscribe(
        (response) => {
          console.log(response);
          // Add the image URL to the storedImages array
          this.storedImages.push(response.url);
          console.log(this.storedImages);

        },
        (error) => {
          console.log(error);
          // Handle error during image upload
        }
      );
    });
    // Reset the input element's value to clear the selected images
    input.value = '';
  }
  deleteImage(imageUrl: string): void {
    // Remove the image URL from the storedImages array
    this.storedImages = this.storedImages.filter(url => url !== imageUrl);
  }



  openImagePopup(): void {
    const dialogRef = this.dialog.open(imagePopUpdateComponent, {
      data: {
        storedImages: this.storedImages,
        oldPropertyImages: this.oldProperty.ImagesURLs
      },
      maxHeight: '70vh',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe((result: { storedImages: string[], oldPropertyImages: string[] }) => {
      if (result) {
        this.storedImages = result.storedImages;
        this.oldProperty.ImagesURLs = result.oldPropertyImages;
        console.log('Updated storedImages:', this.storedImages);
        console.log('Updated oldPropertyImages:', this.oldProperty.ImagesURLs);
      }
    });
  }






  getSelectedCountryName(): string {
    const selectedCountry = this.countries.find(country => country.id === +this.selectedCountry);
    return selectedCountry ? selectedCountry.name : '';
  }

  getSelectedCityName(): string {
    const selectedCity = this.cities.find(city => city.id === +this.selectedCity);
    return selectedCity ? selectedCity.name : '';
  }

  getPropertyData(propertyId: string): void {
    this.hostService.GetPropertyById(propertyId).subscribe(
      (data) => {
        this.oldProperty.propertyName = data.propertyName;
        this.oldProperty.ImagesURLs = data.images.map((image: any) => image.url);
        console.log(this.oldProperty.ImagesURLs);
        this.oldProperty.propertyId = data.propertyId;
        this.oldProperty.maxNumberOfGuests = data.maxNumberOfGuests;
        this.oldProperty.bedroomsCount = data.bedroomsCount;
        this.oldProperty.bathroomsCount = data.bathroomsCount;
        this.oldProperty.bedCount = data.bedCount;
        this.oldProperty.pricePerNight = data.pricePerNight;
        this.oldProperty.categories = data.categories;
        this.oldProperty.countries = data.countries;
        this.oldProperty.oldCategoryId = data.oldCategoryId;
        this.oldProperty.oldCountryId = data.oldCountryId;
        this.oldProperty.oldCityId = data.oldCityId;
        this.oldProperty.address = data.address;
        this.oldProperty.description = data.description;
        this.oldProperty.amenities = data.amenities;
        this.oldProperty.oldAmenities = data.oldAmenities;

        // Set the preselected amenities
        this.selectedAmenities = this.oldProperty.oldAmenities;

        // Find the selected country
        const selectedCountry = this.countries.find((country) => country.id === this.oldProperty.oldCountryId);
        if (selectedCountry) {
          this.selectedCountry = selectedCountry.id.toString();

          // Set the cities based on the selected country
          this.cities = selectedCountry.cities;
        }
        // Find the selected city
        const selectedCity = this.cities.find((city) => city.id === this.oldProperty.oldCityId);
        if (selectedCity) {
          this.selectedCity = selectedCity.id.toString();
        }
        // Find the selected category
        const selectedCategory = this.categories.find((category) => category.id === this.oldProperty.oldCategoryId);
        if (selectedCategory) {
          this.selectedCategory = selectedCategory.id;
        }

      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Get property data completed successfully');
      }
    );
  }
  // deleteOldImage(imageUrl: string): void {
  //   // Remove the image URL from the storedImages array
  //   this.oldProperty.ImagesURLs = this.oldProperty.ImagesURLs.filter(url => url !== imageUrl);
  // }

  onCountryChange(): void {
    const selectedCountry = this.listsData.countries.find((country: any) => country.id === +this.selectedCountry);
    this.cities = selectedCountry ? selectedCountry.cities : [];
    this.selectedCity = ''; // Reset the selected city when the country changes
  }

  onAmenitySelectionChange(event: MatSelectChange): void {
    // Retrieve the selected options
    const selectedOptions = event.value;

    // Update the selected amenities array
    this.selectedAmenities = selectedOptions;
  }


  updateProperty(propertyForm: NgForm): void {
    if (propertyForm.invalid) {
      return;
    }

    // Set the updated property data
    const updatedProperty: PropertyUpdateDto = {
      propertyId: this.oldProperty.propertyId,
      propertyName: this.oldProperty.propertyName.trim(),
      ImagesURLs: this.storedImages.concat(this.oldProperty.ImagesURLs), // Concatenate the existing images with the new images
      MaxNumberOfGuests: this.oldProperty.maxNumberOfGuests,
      BedroomsCount: this.oldProperty.bedroomsCount,
      BathroomsCount: this.oldProperty.bathroomsCount,
      BedCount: this.oldProperty.bedCount,
      PricePerNight: this.oldProperty.pricePerNight,
      CategoryId: +this.selectedCategory,
      CityId: +this.selectedCity, // Use the selected city value
      CountryId: +this.selectedCountry,
      Address: this.oldProperty.address.trim(),
      Description: this.oldProperty.description.trim(),
      AmenitiesId: this.selectedAmenities,


    };

    console.log('Updated Property:', updatedProperty); // Log the updated property object

    this.hostService.UpdateProperty(updatedProperty).subscribe(
      () => {
        console.log('Property updated successfully');
        this.router.navigate(['HostDashboardComponent'], { queryParams: { showHostProperty: true } });
        // Show snackbar message
        this.snackBar.open('Property added successfully', 'Close', {
          duration: 4000, // Duration in milliseconds
          verticalPosition: "top",
        });
      },
      (error) => {
        console.log('Error updating property:', error);
      }
    );
  }


}

