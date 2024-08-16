import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../resources/services/user.service';
import { UserDto } from '../../resources/models/user.model';
import { FormService } from '../../resources/services/form.service';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnDestroy {
  userForm: FormGroup;
  isLoading$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private formService: FormService
  ) {
    this.userForm = this.formService.createUserForm();
  }

  onSubmit(user: UserDto) {
    this.isLoading$.next(true);

    this.userService.createUser(user).pipe(
      takeUntil(this.destroy$),
      tap({
        next: () => this.isLoading$.next(false),
        error: () => this.isLoading$.next(false)
      }),
      finalize(() => this.isLoading$.next(false))
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
