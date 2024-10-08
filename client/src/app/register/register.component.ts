import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  @Output() cancelRegister = new EventEmitter();
  private toastr = inject(ToastrService);
  // cancelRegister = output<boolean>();
  // usersFormHomeComponent = input.required<any>()
  model: any = {};

  handleCancel() {
    this.cancelRegister.emit(false);
  }
  handleRegister() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.handleCancel();
      },
      error: (error) => this.toastr.error(error.error),
    });
  }
}
