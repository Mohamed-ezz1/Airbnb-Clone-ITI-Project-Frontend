import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-image-popup",
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']

})
export class ImagePopupComponent {
  imageUrls: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imageUrls = data.imageUrls;
  }
}
