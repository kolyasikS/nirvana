
import {object, string} from 'yup';
import {emailValidationObject, passwordValidationObject} from "@/lib/validation/general";

const loginSchema = object({
  email: emailValidationObject.email
    .required('Email is required.'),
  password: string()
    .required('Password is required.')
});
const emailConfirmationSchema = object({
  code: string().length(6, 'Code must be 6 characters').required('Code cannot be empty.')
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

export async function validateEmailConfirmation(emailConfirmDto: EmailConfirmDto): Promise<ValidationResult> {
  return await emailConfirmationSchema.validate(emailConfirmDto)
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}
