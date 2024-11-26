import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const [users, roles, permissions, activities] = await Promise.all([
    api.getUsers(),
    api.getRoles(),
    api.getPermissions(),
    api.getAllActivities(),
  ]);

  const results = [
    ...users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      )
      .map((user) => ({ type: "user", ...user })),
    ...roles
      .filter((role) => role.name.toLowerCase().includes(query.toLowerCase()))
      .map((role) => ({ type: "role", ...role })),
    ...permissions
      .filter(
        (permission) =>
          permission.name.toLowerCase().includes(query.toLowerCase()) ||
          permission.description.toLowerCase().includes(query.toLowerCase())
      )
      .map((permission) => ({ type: "permission", ...permission })),
    ...activities
      .filter((activity) =>
        activity.details?.toLowerCase().includes(query.toLowerCase())
      )
      .map((activity) => ({ type: "user", ...activity.user })),
  ];

  return NextResponse.json({ results });
}
