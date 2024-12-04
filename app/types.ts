/* eslint-disable @typescript-eslint/no-unused-vars */
// General
type FlowStepProps = {
  nextStep: () => void;
  previousStep: () => void;
}

// Controllers

// Controllers - AuthController
interface LoginDto {
  password: string;
  email: string;
}
interface SendCodeDto {
  email: string;
}
interface VerifyCodeDto {
  email: string;
  code: string;
}
interface SetNewPasswordDto {
  newPassword: string;
  confirmPassword: string;
}

// Controllers - AdminController
interface GetUser {
  userId: string;
}

// Validation
interface ValidationResult {
  error: boolean;
  message: string;
}

interface ValidationOptions {
  required?: boolean;
}

interface ServerResponseError {
  type: string;
  title: string;
  status: number;
  errors: any[];
}

interface IResponse {
  message: string;
  data: any;
  error: boolean;
}

interface IUser {
  id: string;
  role: string;
}

interface IUserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  sex: string;
  role: string;
  emailConfirmed: boolean;
}

interface IUpdateUserDetails {
  email: string;
  firstName: string;
  lastName: string;
  sex: string;
  role: string;
}