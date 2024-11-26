export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface UserActivity {
  id: string;
  user: User;
  action: string;
  createdAt: string;
  timestamp: number;
  details?: string;
}
