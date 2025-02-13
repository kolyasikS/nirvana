/* eslint-disable @typescript-eslint/no-unused-vars */
// General
interface FlowStepProps {
  nextStep: () => void;
  previousStep: () => void;
}
interface IBreadcrumb {
  title: string;
  route: string;
}
interface IPagination {
  pageNumber?: number;
  pageSize?: number;
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
  password: string;
  confirmPassword: string;
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
  email: string;
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
  assignmentToUserId: string;
}

// Item
interface ICreateItem {
  name: string;
  quantity: number;
  minimumStockQuantity: number;
}
interface IDeleteItem {
  id: string;
}
interface IUpdateItem {
  id: string;
  name: string;
  minimumStockQuantity: number;
}
interface IOrder {
  items: IOrderItem[];
}
interface IOrderItem {
  id: string;
  name: string;
  quantity: number;
}
interface IModifyItem {
  itemId: string;
  amount: number;
}
interface IItemHistory {
  dateOfAction: string; // date
  item: IItem;
  performedAction: 'Put',
  user: IUserDetails;
  value: number;
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

interface IItem {
  id: string;
  name: string;
  quantity: number;
  minimumStockQuantity: number;
}

interface IRole {
  id: string;
  name: string;
}