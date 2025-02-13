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

export function formatExportItemsData(items: IItem[]) {
  const headers = [
    { label: "Name", key: "name" },
    { label: "Quantity", key: "quantity" },
    { label: "Minimum Required Quantity", key: "minimumStockQuantity" },
  ];

  const csvReport = {
    data: items,
    headers: headers,
    filename: 'nirvana_items.csv'
  };

  return csvReport;
}

export function formatExportItemsHistoryData(itemsHistory: IItemHistory[]) {
  const headers = [
    { label: "Item Name", key: "item_name" },
    { label: "Item Change Value", key: "value" },
    { label: "Performer Name", key: "user_fullname" },
    { label: "Performed Action", key: "performedAction" },
    { label: "Date", key: "dateOfAction" },
  ];

  const csvReport = {
    data: itemsHistory.map(ih => ({
      item_name: ih.item.name,
      value: ih.value,
      user_fullname: `${ih.user.firstName} ${ih.user.lastName}`,
      performedAction: ih.performedAction,
      dateOfAction: ih.dateOfAction,
    })),
    headers: headers,
    filename: 'nirvana_items-history.csv'
  };

  return csvReport;
}