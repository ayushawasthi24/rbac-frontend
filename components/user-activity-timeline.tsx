"use client";

import { useState, useEffect } from "react";
import { User, UserActivity } from "@/types";
import { api } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserActivityTimelineProps {
  user: User;
  onClose: () => void;
}

export function UserActivityTimeline({
  user,
  onClose,
}: UserActivityTimelineProps) {
  const [activities, setActivities] = useState<UserActivity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const userActivities = await api.getUserActivities(user.id);
      setActivities(userActivities);
    };
    fetchActivities();
  }, [user.id]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user.name}'s Activity Timeline</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {activities.map((activity, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="font-semibold">{activity.action}</div>
              <div className="text-sm text-gray-500">
                {new Date(activity.timestamp).toLocaleString()}
              </div>
              {activity.details && (
                <div className="mt-1 text-sm">{activity.details}</div>
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
