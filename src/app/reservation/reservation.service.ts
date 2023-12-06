import { Injectable } from '@angular/core';
import { Reservation } from './../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];
  private apiUrl = 'http://localhost:3001';
  
  constructor(private http: HttpClient){}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`);
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/reservation/${id}`);
  }

  addReservation(reservation: Reservation): Observable<object> {
    return this.http.post(`${this.apiUrl}/reservation`, reservation);
  }

  deleteReservation(id: string): Observable<object> {
    return this.http.delete(`${this.apiUrl}/reservation/${id}`);
  }

  updateReservation(id:  string, updatedReservation: Reservation): Observable<void> {
   return this.http.put<void>(`${this.apiUrl}/reservation/${id}`, updatedReservation);
  }
}
