import {USER_ROLES_ENUM} from "@lib/constants";

export function formatExportUsersData(users: IUserDetails[]) {
  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Email Confirmed", key: "emailConfirmed" },
    { label: "Gender", key: "sex" },
    { label: "Role", key: "role" },
  ];

  const csvReport = {
    data: users.map(user => ({...user, role: user.role === USER_ROLES_ENUM.InventoryManager ? 'Inventory Manager' : user.role })),
    headers: headers,
    filename: 'nirvana_users.csv'
  };

  return csvReport;
}