import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  baseURL = 'https://localhost:5001/api/';
  members = signal<Member[]>([]);

  getMembers() {
    return this.http.get<Member[]>(this.baseURL + 'users').subscribe({
      next: (response) => this.members.set(response),
    });
  }

  getMemberByUsername(username: string) {
    const member = this.members().find((i) => i.userName === username);
    if (member !== undefined) return of(member);

    return this.http.get<Member>(this.baseURL + `users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseURL + 'users', member).pipe(
      tap(() => {
        this.members.update((members) =>
          members.map((m) => (m.userName === member.userName ? member : m))
        );
      })
    );
  }
}
