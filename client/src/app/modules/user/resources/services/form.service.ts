import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private readonly fb: FormBuilder) {}

  public createUserForm(initialValues: Partial<UserDto> = {}): FormGroup {
    return this.fb.group({
      username: [initialValues.username || '', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      email: [initialValues.email || '', [Validators.required, Validators.email]],
      type: [initialValues.type || 'user', Validators.required],
      password: [initialValues.password || '', [Validators.required, Validators.minLength(5), Validators.maxLength(24), 
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)]],
    });
  }
}
