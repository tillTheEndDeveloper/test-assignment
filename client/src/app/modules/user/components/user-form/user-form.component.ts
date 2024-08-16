import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserDto } from '../../resources/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'] 
})
export class UserFormComponent {
  @Input() userForm!: FormGroup; 
  @Input() isLoading = false;
  @Output() submitUser = new EventEmitter<UserDto>();

  onSubmit() {
    if (this.userForm.valid) {
      this.submitUser.emit(this.userForm.value);
    }
  }
}
