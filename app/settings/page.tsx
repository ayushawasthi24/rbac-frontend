"use client";

import { useState } from "react";
import { useLoading } from "@/lib/loading-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const [language, setLanguage] = useState<"en" | "es" | "fr">("en");
  const [notifications, setNotifications] = useState(true);
  const { setIsLoading } = useLoading();

  const { toast } = useToast();

  const { theme, setTheme } = useTheme();

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        toast({
          title: "Settings saved",
          description: "Your preferences have been updated successfully.",
        });
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 m-8">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>Select your preferred theme.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={theme}
              onValueChange={(value: "light" | "dark") => setTheme(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark">Dark</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Language</CardTitle>
            <CardDescription>Choose your preferred language.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={language}
              onValueChange={(value: "en" | "es" | "fr") => setLanguage(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="lang-en" />
                <Label htmlFor="lang-en">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="es" id="lang-es" />
                <Label htmlFor="lang-es">Español</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fr" id="lang-fr" />
                <Label htmlFor="lang-fr">Français</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure your notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
          </CardContent>
        </Card>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
}
