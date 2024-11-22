import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../evenement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../model/Event';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../model/Reservation';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {

  events: Event[] = [];
  event: any= [];
  eventId!: number;
  nomReservation: string = '';
  reservation: Reservation[]=[];

  constructor(private evenementService: EvenementService, private router: Router, 
    private formBuilder: FormBuilder,
    private http: HttpClient ,// Ajout de HttpClient
    private route: ActivatedRoute ,
    private reservationService: ReservationService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadUniversites();
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Le '+' convertit la valeur en nombre
    });
  }

  loadUniversites() {
    this.evenementService.getAllEvent().subscribe(
      data => {
        this.events = data as Event[];
        console.log('Event:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des événements', error);
      }
    );
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

}
