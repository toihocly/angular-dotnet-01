import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";


interface AppUser {
  id: number;
  userName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent implements OnInit {

  title = 'client';
  httpClient = inject(HttpClient);
  private accountService = inject(AccountService);
  users: AppUser[] = [];


  ngOnInit(): void {
    this.getUsers(); 
    this.setCurrentUser();
  }


  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }


  getUsers() {
    this.httpClient.get<AppUser[]>("https://localhost:5001/api/users").subscribe({
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
