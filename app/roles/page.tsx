"use client";

import { useState, useEffect } from "react";
import { Role, Permission } from "@/types";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLoading } from "@/lib/loading-context";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState<Omit<Role, "id">>({
    name: "",
    permissions: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [permissionFilter, setPermissionFilter] = useState("all");

  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [roles, permissions] = await Promise.all([
          api.getRoles(),
          api.getPermissions(),
        ]);
        setRoles(roles);
        setFilteredRoles(roles);
        setPermissions(permissions);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setIsLoading]);

  useEffect(() => {
    const filtered = roles.filter((role) => {
      const nameMatch = role.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const permissionMatch =
        permissionFilter === "all" ||
        role.permissions.includes(permissionFilter);
      return nameMatch && permissionMatch;
    });
    setFilteredRoles(filtered);
  }, [roles, searchTerm, permissionFilter]);

  const handleAddRole = async () => {
    setIsLoading(true);
    const role = await api.createRole(newRole);
    setRoles([...roles, role]);
    setIsAddRoleOpen(false);
    setNewRole({ name: "", permissions: [] });
    setIsLoading(false);
  };

  const handleUpdateRolePermissions = async (
    id: string,
    permissionName: string,
    checked: boolean
  ) => {
    setIsLoading(true);
    const role = roles.find((r) => r.id === id);
    if (!role) return;

    const updatedPermissions = checked
      ? [...role.permissions, permissionName]
      : role.permissions.filter((p) => p !== permissionName);

    await api.updateRole(id, { permissions: updatedPermissions });
    setRoles(
      roles.map((r) =>
        r.id === id ? { ...r, permissions: updatedPermissions } : r
      )
    );
    setIsLoading(false);
  };

  const handleDeleteRole = async (id: string) => {
    setIsLoading(true);
    await api.deleteRole(id);
    setRoles(roles.filter((role) => role.id !== id));
    setIsLoading(false);
  };

  return (
    <div className="m-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Roles Management</h2>
        <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
          <DialogTrigger asChild>
            <Button>Add Role</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Permissions</Label>
                <div className="col-span-3">
                  {permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={newRole.permissions.includes(permission.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewRole({
                              ...newRole,
                              permissions: [
                                ...newRole.permissions,
                                permission.name,
                              ],
                            });
                          } else {
                            setNewRole({
                              ...newRole,
                              permissions: newRole.permissions.filter(
                                (p) => p !== permission.name
                              ),
                            });
                          }
                        }}
                      />
                      <label
                        htmlFor={`permission-${permission.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button onClick={handleAddRole}>Add Role</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <Select value={permissionFilter} onValueChange={setPermissionFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by permission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Permissions</SelectItem>
              {permissions.map((permission) => (
                <SelectItem key={permission.id} value={permission.name}>
                  {permission.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {permissions.map((permission) => (
                    <Badge
                      key={permission.id}
                      variant={
                        role.permissions.includes(permission.name)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        handleUpdateRolePermissions(
                          role.id,
                          permission.name,
                          !role.permissions.includes(permission.name)
                        )
                      }
                    >
                      {permission.name}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
