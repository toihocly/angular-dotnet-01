import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


// class AppUser {
//   id: number;
//   userName: string;

//   public constructor(id: number, userName: string) {
//     this.id = id;
//     this.userName = userName;
//   }
// }

interface AppUser {
  id: number;
  userName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent implements OnInit {

  title = 'client';
  httpClient = inject(HttpClient);
  users: AppUser[] = [];


  ngOnInit(): void {
    this.httpClient.get<AppUser[]>("http://localhost:5000/api/users").subscribe({
      next: data => {this.users = data 

        console.log(this.users);
        console.log(this.users[0][
          'userName'
        ]);

        console.log(this.users[2].userName);

      },
      error: error => { console.log(error)},
      complete: () => { console.log(" load complete")}
    })
  }


}
