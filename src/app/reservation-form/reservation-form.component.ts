import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Reservation } from '../models/reservation';
import {ReservationService} from './../reservation/reservation.service';

@Component({
	selector: 'app-reservation-form',
	templateUrl: './reservation-form.component.html',
	styleUrls: ['./reservation-form.component.scss']
})

export class ReservationFormComponent {
	reservationForm!: FormGroup;

constructor(private fb: FormBuilder,
	private reservationService: ReservationService,
	private router: Router,
	private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
		'checkInDate': ['', Validators.required],
		'checkOutDate': ['', Validators.required],
		'guestName': ['', [Validators.required, Validators.minLength(2)]],
		'guestEmail': ['', [Validators.required, Validators.email]],
		'roomNumber': ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
		this.reservationService.getReservation(id).subscribe(reservation => {
			if(reservation)
			this.reservationForm.patchValue(reservation);
		});
	}
  }

  onSubmit() {
    if(this.reservationForm.valid){
		let id = this.activatedRoute.snapshot.paramMap.get('id');
		let reservation = this.reservationForm.value;

		if(id){
		this.reservationService.updateReservation(id, reservation).subscribe(reservation => {
			console.log('Reservation updated successfully!');
		});
		} else {
		this.reservationService.addReservation(reservation).subscribe(reservation => {
			console.log('Reservation added successfully!');
		});
		}
    }

    this.router.navigate(['/list']);
  }
}
