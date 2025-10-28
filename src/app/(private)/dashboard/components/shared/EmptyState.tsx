"use client";

import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

const EmptyState = () => {
  return (
    <Card className="glass-card p-12 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">No projects found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query to find more projects
        </p>
      </div>
    </Card>
  );
};

export default EmptyState;
