// API
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

// Auth
export const AUTH_HEADER_NAME = 'nirvana-auth'

export enum USER_ROLES_ENUM {
  Administrator = 'Administrator',
  Manager = 'Manager',
  InventoryManager = 'InventoryManager',
  Technician = 'Technician',
  Housemaid = 'Housemaid',
}

export const USER_ROLES = [
  {
    id: 'cbc43a8e-f7bb-4445-baaf-1add431ffbbf',
    name: USER_ROLES_ENUM.Administrator,
  },
  {
    id: 'cac43a6e-f7bb-4448-baaf-1add431ccbbf',
    name: USER_ROLES_ENUM.Manager,
  },
  {
    id: '36f579e8-2f52-473f-91f2-550331d81d04',
    name: USER_ROLES_ENUM.InventoryManager,
  },
  {
    id: 'a0f845d1-2680-459d-981a-d40b176c5ca8',
    name: USER_ROLES_ENUM.Technician,
  },
  {
    id: '9beb8da7-4160-4db7-9982-05604a4e51d5',
    name: USER_ROLES_ENUM.Housemaid,
  },
];

export const TASK_TYPES = [
  {
    id: '58302ce8-d000-4301-b24b-52cd5ded95a2',
    name: 'Replace light bulb',
    roleId: 'a0f845d1-2680-459d-981a-d40b176c5ca8'
  },
  {
    id: 'c8837679-cb17-41a3-93b0-c7d797a61a76',
    name: 'Clear room',
    roleId: '9beb8da7-4160-4db7-9982-05604a4e51d5'
  },
];

// LocalStorage
export const UserStoreKey = 'UserStore'

// General
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];