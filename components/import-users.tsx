"use client";

import { useState } from "react";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImportUsersProps {
  onImport: (users: User[]) => void;
}

export function ImportUsers({ onImport }: ImportUsersProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to import.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    const fileContent = await file.text();
    let importedUsers: User[] = [];

    try {
      if (file.name.endsWith(".csv")) {
        const lines = fileContent.split("\n");
        const headers = lines[0].split(",");
        importedUsers = lines.slice(1).map((line) => {
          const values = line.split(",");
          return headers.reduce((user, header, index) => {
            user[header.toLowerCase() as keyof User] = values[index] as any;
            return user;
          }, {} as User);
        });
      } else if (file.name.endsWith(".json")) {
        importedUsers = JSON.parse(fileContent);
      } else {
        throw new Error("Unsupported file format");
      }

      onImport(importedUsers);
      toast({
        title: "Users Imported",
        description: `${importedUsers.length} users have been successfully imported.`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description:
          "There was an error importing the users. Please check the file format.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      setFile(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import Users
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Users</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">Upload CSV or JSON file</Label>
            <Input
              id="file"
              type="file"
              accept=".csv,.json"
              onChange={handleFileChange}
            />
          </div>
          <Button onClick={handleImport} disabled={!file || isImporting}>
            {isImporting ? "Importing..." : "Import"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
