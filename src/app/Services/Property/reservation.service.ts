import { Injectable } from '@angular/core';
import { ReservationDto } from 'src/app/types/ReservationDto';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor() { }
  public reservDto! : ReservationDto;

  setReservationDto(dto: ReservationDto){
    this.reservDto = dto;
  }

  getReservationDto(): ReservationDto{
    return this.reservDto;
  }
}
