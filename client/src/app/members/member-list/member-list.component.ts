import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  private memberService = inject(MemberService);
  users: Member[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.memberService.getMembers().subscribe({
      next: (data) => {
        this.users = data;

        console.log(this.users);
        console.log(this.users[0]['userName']);

        console.log(this.users[2].userName);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log(' load complete');
      },
    });
  }
}
