
import { object } from 'yup';
import {emailValidationObject, passwordValidationObject} from "@/lib/validation/general";

const loginSchema = object({
  email: emailValidationObject.email
    .required('Email is required.'),
  password: passwordValidationObject.password
    .required('Password is required.')
});

export async function validateLogin(loginDto: LoginDto): Promise<ValidationResult> {
  return await loginSchema.validate(loginDto)
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}
