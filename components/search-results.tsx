import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type SearchResult = {
  type: "user" | "role" | "permission";
  id: string;
  name: string;
  email?: string;
  description?: string;
};

type SearchResultsProps = {
  results: SearchResult[];
  onClose: () => void;
};

export function SearchResults({ results, onClose }: SearchResultsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Results</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {results.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              className="flex items-center space-x-4"
            >
              <Badge>{result.type}</Badge>
              <div>
                <h3 className="font-semibold">{result.name}</h3>
                {result.type === "user" && result.email && (
                  <p className="text-sm text-gray-500">{result.email}</p>
                )}
                {result.type === "permission" && result.description && (
                  <p className="text-sm text-gray-500">{result.description}</p>
                )}
              </div>
              <Link
                href={`/${result.type}s`}
                className="ml-auto text-blue-500 hover:underline"
                onClick={handleClose}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
