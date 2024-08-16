import Joi from 'joi';
import { UserRole } from '../models/roleEnum';

export const userValidationSchema = Joi.object({
    username: Joi.string().min(3).max(24).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    type: Joi.string().valid(UserRole.User, UserRole.Admin).required(),
    password: Joi.string()
        .min(5)
        .max(24)
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])'))
        .required(),
});
