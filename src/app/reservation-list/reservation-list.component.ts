import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  reservations!: Reservation[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(
      (reservations) => this.reservations = reservations
    )
  }

  onDelete(id: string): void{
    this.reservationService.deleteReservation(id).subscribe(
      ()=> console.log(`Reservationdeleted`),
    );
    this.reservationService.getReservations().subscribe(
      (reservations) => this.reservations = reservations
    )
  }
}
