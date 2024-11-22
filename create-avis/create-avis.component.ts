import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Avis } from '../model/Avis';
import { AvisService } from '../avis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-avis',
  templateUrl: './create-avis.component.html',
  styleUrls: ['./create-avis.component.css']
})
export class CreateAvisComponent {

  idPost: any; // Define idPost property

  avisForm!: FormGroup;
  aviis: any= [];
  eventId!: number;
  contenu: string = '';
  avis: Avis[]=[];

  constructor(
    private avisService: AvisService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient ,// Ajout de HttpClient
    private route: ActivatedRoute // Injectez ActivatedRoute ici

  ) {}
  ngOnInit(): void {
    this.avisForm = this.formBuilder.group({
      contenu: ['', [Validators.required]], // Correction ici: Ajout du crochet fermant
     
    });
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Le '+' convertit la valeur en nombre
    });
    
  }
  
  saveEvent(idEvent: number) { // Assurez-vous de passer l'idEvent en tant que paramètre à cette méthode
    if (this.avisForm.valid) {
      this.avisService.addAvisToPostAndUser(this.avisForm.value, this.eventId).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/liste']);
        },
        (error) => console.error('Error:', error)
      );
    } else {
      console.error('Le formulaire n\'est pas valide.');
    }
  }
  
  

  onSubmit() {
    if (this.avisForm.valid) {
      console.log(this.avisForm.value);
      this.saveEvent(this.aviis); // Utilisez la propriété eventId lors de l'appel de saveEvent
    } else {
      console.log('Le formulaire n\'est pas valide. Veuillez remplir tous les champs correctement.');
    }
  }
  addCommentToPostAndUser(idPost: any) {
    console.log('ID of the post:', idPost); // Add this line for debugging

    this.avisService.addAvisToPostAndUser(this.avisForm.value, idPost)
      .subscribe(
        (addedAvis: Avis) => {
          // Successfully added avis, you can handle it here
          console.log('avis added:', addedAvis);
          location.reload();
          // You may want to update your comments list or do other actions here
        },
        (error) => {
          // Handle errors here
          console.error('Error adding comment:', error);

          // Check for a specific error message and display a custom alert
          if (error && typeof error === 'string') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Comment contains inappropriate content or a subject that should not be posted here. Please review your post before submitting.'
            });
          }
        }
      );
  }
}
