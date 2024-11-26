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