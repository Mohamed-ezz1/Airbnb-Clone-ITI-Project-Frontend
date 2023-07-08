import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStarRating]'
})
export class StarRatingDirective implements OnChanges {

  @Input() appStarRating!: number;
  constructor(private el: ElementRef) { }
  ngOnChanges() {
    const rating = this.appStarRating;
    const stars = '&#9733;'.repeat(rating) + '&#9734;'.repeat(5 - rating);
    this.el.nativeElement.innerHTML = stars;
    this.el.nativeElement.style.fontSize = '1.5rem';
    this.el.nativeElement.querySelectorAll('.star').forEach((star: { style: { color: string; }; }) => {
      star.style.color = 'yellow';
    });
  }
}
