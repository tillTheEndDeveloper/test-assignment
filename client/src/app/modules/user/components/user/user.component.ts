import { Component } from '@angular/core';
import { UserService } from '../../resources/services/user.service';
import { UserDto } from '../../resources/models/user.model';
import { FormService } from '../../resources/services/form.service';
import { FormGroup } from '@angular/forms';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  userForm: FormGroup;
  isLoading = false;

  constructor(
    private userService: UserService,
    private formService: FormService
  ) {
    this.userForm = this.formService.createUserForm();
  }

  onSubmit(user: UserDto) {
    this.isLoading = true;

    this.userService.createUser(user).pipe(
      tap({
        next: () => this.isLoading = false,
        error: () => this.isLoading = false
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }
}
