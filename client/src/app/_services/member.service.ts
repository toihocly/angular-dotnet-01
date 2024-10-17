import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  baseURL = 'https://localhost:5001/api/';

  getMembers() {
    return this.http.get<Member[]>(this.baseURL + 'users');
  }

  getMemberByUsername(username: string) {
    return this.http.get<Member>(this.baseURL + `users/${username}`);
  }
}
