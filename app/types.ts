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
interface EmailConfirmDto {
  code: string;
}


// Controllers - AdminController

interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  sex: string;
  role: string;
}
interface UpdateUserDto {
  id: string;
  firstName: string;
  lastName: string;
  sex: string;
  role: string;
}


// Validation
interface ValidationResult {
  error: boolean;
  message: string;
}
interface ValidationOptions {
  required?: boolean;
}

// Response
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

// User
interface IUser {
  id: string;
  role: string;
}
interface IUpdateUserDetails {
  id: string;
  firstName: string;
  lastName: string;
  sex: string;
  role: string;
}
interface ICreateUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  role: string;
}

// Task
interface ICreateTask {
  startTime: {
    hours: string;
    minutes: string;
  },
  endTime: {
    hours: string;
    minutes: string;
  },
  details: string;
  typeId: string;
  date: Date;
  userId: string;
}
interface IDeleteTask {
  id: string;
}
interface IMarkAsCompletedTask {
  id: string;
}

// entities
interface IUserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  sex: string;
  role: string;
  emailConfirmed: boolean;
}

interface ITask {
  id: string;
  assignment: {
    name: string;
    role: {
      name: string;
    }
  };
  user: any;
  details: string;
  startTime: string;
  endTime: string;
  isCompleted: boolean;
}