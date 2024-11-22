import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Avis } from './model/Avis';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private apiUrl = 'http://localhost:8080/Avis/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient ) { }
  

    addAvisToPostAndUser(avis: Avis, postId: number): Observable<Avis> {
      const url = `${this.apiUrl}addCommentToPostAndUser/${postId}`;
      return this.http.post<Avis>(url, avis).pipe(
        catchError((error) => {
          console.error('Error adding avis:', error);

          if (error && error.error && error.error.message) {
            // Handle bad word notification only if the error message indicates a bad word
            const errorMessage = error.error.message.toLowerCase();
            if (errorMessage.includes('inappropriate content') || errorMessage.includes('should not be posted')) {
              const customErrorMessage = 'Avis contains inappropriate content or contains a subject that should not be posted here. Please review your comment before submitting.';
              console.error('Server error message:', customErrorMessage);
              // Return a generic error to the caller without showing notification
              return throwError(customErrorMessage);
            }
          }

          // Re-throw the error if it's not related to bad word detection
          return throwError(error);
        })
      );
    }

    // Function to check if a string contains a bad word
    containsBadWord(inputString: string): Observable<boolean> {
      return this.http.post<boolean>(`${this.apiUrl}/checkBadWord`, { inputString });
    }
  getEvent(idEvent: number): Observable<Event>{
    const url = `${this.apiUrl + "get"}/${idEvent}`;
    return this.http.get<Event>(url, this.httpOptions)

}

 
}
