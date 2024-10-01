
import { object, string } from 'yup';

export const emailValidationObject = {
  email: string().email('Invalid email address. Please enter a valid email.')
}
export async function validateEmail(email: string, options?: ValidationOptions): Promise<ValidationResult> {


  if (options?.required) {
    emailValidationObject.email = emailValidationObject.email.required('Email is required.');
  }

  const emailSchema = object(emailValidationObject);

  return await emailSchema.validate({
    email
  })
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}

export async function validateCode(code: string, options?: ValidationOptions): Promise<ValidationResult> {
  const validationObject = {
    code: string().length(6, 'Code must be 6 characters.')
  }

  if (options?.required) {
    validationObject.code = validationObject.code.required('Code is required.');
  }

  const validationSchema = object(validationObject);

  return await validationSchema.validate({
    code
  })
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}

export const passwordValidationObject = {
  password: string()
    .trim()
    .min(8, 'Password must be at least 8 characters long.')
    .max(32, 'Password cannot be longer than 32 characters.')
    .matches(/^(?=.*\d).+$/, 'Password must contain at least one number.'),
}
export async function validatePassword(password: string, options?: ValidationOptions): Promise<ValidationResult> {
  if (options?.required) {
    passwordValidationObject.password = passwordValidationObject.password.required('Password is required.');
  }

  const validationSchema = object(passwordValidationObject);

  return await validationSchema.validate({
    password
  })
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}