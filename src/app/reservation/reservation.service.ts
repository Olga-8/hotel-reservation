import { Injectable } from '@angular/core';
import { Reservation } from './../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
private reservations: Reservation[] = [];
  constructor() {
    const reservations = localStorage.getItem('reservations');
    reservations ? this.reservations = JSON.parse(reservations) : this.reservations = [];
    }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation {
    return this.reservations.find((reservation) => reservation.id === id)!;
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    this.reservations = this.reservations.filter((reservation) => reservation.id !== id);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(id:  string, updatedReservation: Reservation): void {
    const index = this.reservations.findIndex((reservation) => reservation.id === id);
    
    this.reservations[index] = updatedReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
