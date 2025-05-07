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
interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
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
interface IUpdateTaskStatus {
  assignmentToUserId: string;
  newStatus: IAssignmentToUserStatus;
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
interface IItemCategory {
  id: string;
  name: string;
}

// Assignments
interface ICreateAssessment {
  name: string;
  role: IRole;
}
interface IUpdateAssessment {
  id: string;
  name: string;
  roleId: string;
}
interface IDeleteAssessment {
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
  assignment: IAssignment;
  assignmentToUserStatus: IAssignmentToUserStatus;
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
  itemCategory: IItemCategory;
}
interface IAssignment {
  id: string;
  name: string;
  role: IRole;
}
interface IAssignmentToUserStatus {
  id: string;
  name: string;
}
interface IRole {
  id: string;
  name: string;
}