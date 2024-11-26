"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  Download,
  Users,
  Shield,
  History,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useLoading } from "@/lib/loading-context";
import { useToast } from "@/hooks/use-toast";
import { User, Role, Permission, UserActivity } from "@/types";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeRoles: 0,
    totalPermissions: 0,
    activeSessions: 0,
  });
  const [recentActivities, setRecentActivities] = useState<UserActivity[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const { setIsLoading } = useLoading();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedUsers, fetchedRoles, fetchedPermissions] =
          await Promise.all([
            api.getUsers(),
            api.getRoles(),
            api.getPermissions(),
          ]);
        setUsers(fetchedUsers);
        setRoles(fetchedRoles);
        setPermissions(fetchedPermissions);
        setStats({
          totalUsers: fetchedUsers.length,
          activeRoles: fetchedRoles.length,
          totalPermissions: fetchedPermissions.length,
          activeSessions: fetchedUsers.filter(
            (user) => user.status === "active"
          ).length,
        });

        // Fetch recent activities (we'll use the first user's activities as an example)
        if (fetchedUsers.length > 0) {
          const activities = await api.getUserActivities(fetchedUsers[0].id);
          setRecentActivities(activities.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setIsLoading, toast]);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const userData = await api.getUsers();
      const csvContent = convertToCSV(userData);
      downloadCSV(csvContent, "user_data.csv");
      toast({
        title: "Success",
        description: "User data downloaded successfully",
      });
    } catch (error) {
      console.error("Error downloading user data:", error);
      toast({
        title: "Error",
        description: "Failed to download user data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const convertToCSV = (data: User[]) => {
    const headers = ["ID", "Name", "Email", "Role", "Status"];
    const rows = data.map(
      (user) =>
        `${user.id},${user.name},${user.email},${user.role},${user.status}`
    );
    return `${headers.join(",")}\n${rows.join("\n")}`;
  };

  const downloadCSV = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Roles
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeRoles}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Permissions
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalPermissions}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <History className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSessions}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-4 m-4">
                  <div className="grid gap-2">
                    <div className="text-sm font-medium">Recent Activity</div>
                    {recentActivities.map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 rounded-md p-2 hover:bg-accent"
                      >
                        <div className="size-2 rounded-full bg-sky-500" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {activity.action}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(
                              new Date(activity.createdAt),
                              "dd MMM yyyy HH:mm"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Audit Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.slice(0, 3).map((activity, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.action}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(
                            new Date(activity.createdAt),
                            "dd MMM yyyy HH:mm"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </>
  );
}
