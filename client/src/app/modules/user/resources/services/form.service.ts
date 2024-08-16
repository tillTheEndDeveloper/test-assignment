import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../models/user.model';
import * as Joi from 'joi';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private readonly fb: FormBuilder) {}

  public createUserForm(initialValues: Partial<UserDto> = {}): FormGroup {
    const form = this.fb.group({
      username: [initialValues.username || '', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      email: [initialValues.email || '', [Validators.required, this.joiEmailValidator]],
      type: [initialValues.type || 'user', Validators.required],
      password: [initialValues.password || '', [Validators.required, Validators.minLength(5), Validators.maxLength(24), 
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)]],
    });

    return form;
  }

  private joiEmailValidator(control: { value: string }) {
    const schema = Joi.string().email({ tlds: { allow: false } });
    const { error } = schema.validate(control.value);

    return error ? { joiError: error.details[0].message } : null;
  }
}
