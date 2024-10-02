import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css',
})
export class TestErrorsComponent {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  validationErrors = [];

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: (reponse) => console.log(reponse),
      error: (error) => console.log(error),
    });
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: (reponse) => console.log(reponse),
      error: (error) => console.log(error),
    });
  }

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (reponse) => console.log(reponse),
      error: (error) => console.log(error),
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: (reponse) => console.log(reponse),
      error: (error) => console.log(error),
    });
  }

  getValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (reponse) => console.log(reponse),
      error: (error) => {
        console.log(error);
        this.validationErrors = error;
      },
    });
  }
}
