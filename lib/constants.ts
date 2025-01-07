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
  USER_ROLES_ENUM.Administrator,
  USER_ROLES_ENUM.Manager,
  USER_ROLES_ENUM.InventoryManager,
  USER_ROLES_ENUM.Technician,
  USER_ROLES_ENUM.Housemaid,
];