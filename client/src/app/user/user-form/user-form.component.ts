import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'] 
})
export class UserFormComponent {
  @Input() isLoading = false;
  @Output() submitUser = new EventEmitter<UserDto>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      email: ['', [Validators.required, Validators.email]],
      type: ['user', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(24), 
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.submitUser.emit(this.userForm.value);
    }
  }
}
