import { User, Role, Permission, UserActivity } from "@/types";

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

let userActivities: UserActivity[] = [
  {
    id: "a1",
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
    },
    action: "created_user",
    createdAt: "2024-11-01T08:00:00Z",
    timestamp: 1635792000000,
    details: "Created a new user account for Jane Smith",
  },
  {
    id: "a2",
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
    },
    action: "deleted_user",
    createdAt: "2024-11-02T09:00:00Z",
    timestamp: 1635878400000,
    details: "Deleted user account for Bob Brown",
  },
  {
    id: "a3",
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
    },
    action: "updated_role",
    createdAt: "2024-11-03T10:00:00Z",
    timestamp: 1635964800000,
    details: "Updated role of Alice Johnson to 'user'",
  },
  {
    id: "a4",
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
    },
    action: "approved_content",
    createdAt: "2024-11-04T11:00:00Z",
    timestamp: 1636051200000,
    details: "Approved content submission from Charlie Davis",
  },
  {
    id: "b1",
    user: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
    },
    action: "logged_in",
    createdAt: "2024-11-01T10:00:00Z",
    timestamp: 1635795600000,
    details: "Logged into the platform",
  },
  {
    id: "b2",
    user: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
    },
    action: "updated_profile",
    createdAt: "2024-11-02T11:00:00Z",
    timestamp: 1635882000000,
    details: "Updated profile picture",
  },
  {
    id: "b3",
    user: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
    },
    action: "commented_on_post",
    createdAt: "2024-11-03T12:00:00Z",
    timestamp: 1635968400000,
    details: "Commented on a post in the 'General Discussion' forum",
  },
  {
    id: "c1",
    user: {
      id: "3",
      name: "Alice Johnson",
      email: "alice.j@example.com",
      role: "moderator",
      status: "inactive",
    },
    action: "logged_in",
    createdAt: "2024-11-01T13:00:00Z",
    timestamp: 1635802800000,
    details: "Logged into the platform",
  },
  {
    id: "c2",
    user: {
      id: "3",
      name: "Alice Johnson",
      email: "alice.j@example.com",
      role: "moderator",
      status: "inactive",
    },
    action: "approved_content",
    createdAt: "2024-11-02T14:00:00Z",
    timestamp: 1635888400000,
    details: "Approved user-submitted content for publication",
  },
  {
    id: "c3",
    user: {
      id: "3",
      name: "Alice Johnson",
      email: "alice.j@example.com",
      role: "moderator",
      status: "inactive",
    },
    action: "banned_user",
    createdAt: "2024-11-03T15:00:00Z",
    timestamp: 1635974800000,
    details: "Banned user George Black for violating community guidelines",
  },
  {
    id: "d1",
    user: {
      id: "4",
      name: "Bob Brown",
      email: "bob.brown@example.com",
      role: "guest",
      status: "active",
    },
    action: "logged_in",
    createdAt: "2024-11-01T16:00:00Z",
    timestamp: 1635889200000,
    details: "Logged into the platform as a guest",
  },
  {
    id: "d2",
    user: {
      id: "4",
      name: "Bob Brown",
      email: "bob.brown@example.com",
      role: "guest",
      status: "active",
    },
    action: "viewed_content",
    createdAt: "2024-11-02T17:00:00Z",
    timestamp: 1635975600000,
    details: "Viewed content on the 'Public Articles' page",
  },
  {
    id: "e1",
    user: {
      id: "5",
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: "admin",
      status: "active",
    },
    action: "created_content",
    createdAt: "2024-11-01T18:00:00Z",
    timestamp: 1635979200000,
    details: "Created a new article about 'Tech Trends 2024'",
  },
  {
    id: "e2",
    user: {
      id: "5",
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: "admin",
      status: "active",
    },
    action: "approved_content",
    createdAt: "2024-11-02T19:00:00Z",
    timestamp: 1636065600000,
    details: "Approved a blog post from Jane Smith",
  },
  {
    id: "f1",
    user: {
      id: "6",
      name: "Diana Wilson",
      email: "diana.wilson@example.com",
      role: "user",
      status: "inactive",
    },
    action: "logged_in",
    createdAt: "2024-11-01T20:00:00Z",
    timestamp: 1636062000000,
    details: "Logged into the platform",
  },
  {
    id: "g1",
    user: {
      id: "7",
      name: "Ethan Thomas",
      email: "ethan.t@example.com",
      role: "editor",
      status: "active",
    },
    action: "created_content",
    createdAt: "2024-11-01T21:00:00Z",
    timestamp: 1636148400000,
    details: "Created an editorial piece on 'Best Web Development Practices'",
  },
  {
    id: "g2",
    user: {
      id: "7",
      name: "Ethan Thomas",
      email: "ethan.t@example.com",
      role: "editor",
      status: "active",
    },
    action: "edited_content",
    createdAt: "2024-11-02T22:00:00Z",
    timestamp: 1636234800000,
    details: "Edited article 'Tech in 2024' for clarity",
  },
  {
    id: "h1",
    user: {
      id: "8",
      name: "Fiona White",
      email: "fiona.white@example.com",
      role: "guest",
      status: "active",
    },
    action: "viewed_content",
    createdAt: "2024-11-01T22:00:00Z",
    timestamp: 1636238400000,
    details: "Viewed articles on 'Health and Wellness' section",
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
  getUserActivities: (userId: string) =>
    delay(500).then(() =>
      userActivities.filter((activity) => activity.user.id === userId)
    ),
  getAllActivities: () => delay(500).then(() => userActivities),
};
