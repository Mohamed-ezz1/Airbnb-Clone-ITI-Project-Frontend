import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-pop-update',
  templateUrl: './image-pop-update.component.html',
  styleUrls: ['./image-pop-update.component.css']
})
export class imagePopUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<imagePopUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  deleteImage(imageUrl: string): void {
    console.log('Clicked deleteImage:', imageUrl);


    // Remove the image URL from the storedImages array
    this.data.storedImages = this.data.storedImages.filter((url: string) => url !== imageUrl);

    console.log('Modified storedImages:', this.data.storedImages);
  }
  deleteOldImage(imageUrl: any): void {
    console.log('Clicked deleteOldImage:', imageUrl);

    // Remove the image URL from the oldPropertyImages array
    this.data.oldPropertyImages = this.data.oldPropertyImages.filter((url: string) => url !== imageUrl);

    console.log('Modified oldPropertyImages:', this.data.oldPropertyImages);
  }

  uploadPhotos(e: Event): void {
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files || []);

    if (files.length === 0) {
      return;
    }

    const filesToUpload = files;

    filesToUpload.forEach((file) => {
      // Perform the necessary image upload logic and add the image URL to the storedImages array
      // Example code (replace with your actual logic):
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.data.storedImages.push(event.target.result);
      };
      reader.readAsDataURL(file);
    });

    // Reset the input element's value to clear the selected images
    input.value = '';
  }

  saveChanges(): void {
    // Pass the updated storedImages and oldPropertyImages arrays back to the parent component or service
    this.dialogRef.close({ storedImages: this.data.storedImages, oldPropertyImages: this.data.oldPropertyImages });
  }

}
