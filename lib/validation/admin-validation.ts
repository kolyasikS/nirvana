
import {object, string} from 'yup';
import {emailValidationObject} from "@/lib/validation/general";

const createUserSchema = object({
  sex: string().required('Gender is required.'),
  role: string().required('Post is required.'),
  email: emailValidationObject.email
    .required('Email is required.'),
  lastName: string().required('Last Name is required.'),
  firstName: string().required('First Name is required.'),
});

const updateUserSchema = object({
  id: string().required('User ID is required.'),
  sex: string().required('Gender is required.'),
  role: string().required('Post is required.'),
  lastName: string().required('Last Name is required.'),
  firstName: string().required('First Name is required.'),
});

export async function validateCreateUserSchema(createUser: CreateUserDto): Promise<ValidationResult> {
  return await createUserSchema.validate(createUser)
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}

export async function validateUpdateUserSchema(updateUserDto: UpdateUserDto): Promise<ValidationResult> {
  return await updateUserSchema.validate(updateUserDto)
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}
