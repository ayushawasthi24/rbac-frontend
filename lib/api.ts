import { User, Role, Permission } from "@/types";

let users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "moderator",
    status: "inactive",
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    role: "guest",
    status: "active",
  },
  {
    id: "5",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "6",
    name: "Diana Wilson",
    email: "diana.wilson@example.com",
    role: "user",
    status: "inactive",
  },
  {
    id: "7",
    name: "Ethan Thomas",
    email: "ethan.t@example.com",
    role: "editor",
    status: "active",
  },
  {
    id: "8",
    name: "Fiona White",
    email: "fiona.white@example.com",
    role: "guest",
    status: "active",
  },
  {
    id: "9",
    name: "George Black",
    email: "george.black@example.com",
    role: "moderator",
    status: "active",
  },
  {
    id: "10",
    name: "Helen Green",
    email: "helen.green@example.com",
    role: "editor",
    status: "inactive",
  },
];

let roles: Role[] = [
  {
    id: "1",
    name: "admin",
    permissions: ["read", "write", "delete", "manage_users", "approve_content"],
  },
  { id: "2", name: "user", permissions: ["read"] },
  {
    id: "3",
    name: "moderator",
    permissions: ["read", "approve_content", "ban_users"],
  },
  { id: "4", name: "guest", permissions: ["read"] },
  {
    id: "5",
    name: "editor",
    permissions: ["read", "write", "approve_content"],
  },
];

let permissions: Permission[] = [
  { id: "1", name: "read", description: "Can read data" },
  { id: "2", name: "write", description: "Can write data" },
  { id: "3", name: "delete", description: "Can delete data" },
  {
    id: "4",
    name: "manage_users",
    description: "Can manage user accounts and roles",
  },
  {
    id: "5",
    name: "approve_content",
    description: "Can review and approve submitted content",
  },
  {
    id: "6",
    name: "ban_users",
    description: "Can ban users from the platform",
  },
  {
    id: "7",
    name: "audit_logs",
    description: "Can view and manage system audit logs",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  getUsers: () => delay(500).then(() => users),
  getUser: (id: string) =>
    delay(500).then(() => users.find((user) => user.id === id)),
  createUser: (user: Omit<User, "id">) =>
    delay(500).then(() => {
      const newUser = { ...user, id: String(users.length + 1) };
      users.push(newUser);
      return newUser;
    }),
  updateUser: (id: string, user: Partial<User>) =>
    delay(500).then(() => {
      users = users.map((u) => (u.id === id ? { ...u, ...user } : u));
      return users.find((u) => u.id === id);
    }),
  deleteUser: (id: string) =>
    delay(500).then(() => {
      users = users.filter((u) => u.id !== id);
    }),

  getRoles: () => delay(500).then(() => roles),
  getRole: (id: string) =>
    delay(500).then(() => roles.find((role) => role.id === id)),
  createRole: (role: Omit<Role, "id">) =>
    delay(500).then(() => {
      const newRole = { ...role, id: String(roles.length + 1) };
      roles.push(newRole);
      return newRole;
    }),
  updateRole: (id: string, role: Partial<Role>) =>
    delay(500).then(() => {
      roles = roles.map((r) => (r.id === id ? { ...r, ...role } : r));
      return roles.find((r) => r.id === id);
    }),
  deleteRole: (id: string) =>
    delay(500).then(() => {
      roles = roles.filter((r) => r.id !== id);
    }),

  getPermissions: () => delay(500).then(() => permissions),
  getPermission: (id: string) =>
    delay(500).then(() =>
      permissions.find((permission) => permission.id === id)
    ),
  createPermission: (permission: Omit<Permission, "id">) =>
    delay(500).then(() => {
      const newPermission = {
        ...permission,
        id: String(permissions.length + 1),
      };
      permissions.push(newPermission);
      return newPermission;
    }),
  updatePermission: (id: string, permission: Partial<Permission>) =>
    delay(500).then(() => {
      permissions = permissions.map((p) =>
        p.id === id ? { ...p, ...permission } : p
      );
      return permissions.find((p) => p.id === id);
    }),
  deletePermission: (id: string) =>
    delay(500).then(() => {
      permissions = permissions.filter((p) => p.id !== id);
    }),
};
