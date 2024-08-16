import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { UserDto } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent {
  isLoading = false;

  constructor(private userService: UserService) { }

  onSubmit(user: UserDto) {
    this.isLoading = true;
    this.userService.createUser(user).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
