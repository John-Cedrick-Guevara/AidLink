"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Loader2 } from "lucide-react";

import type { FormStepProps } from "../../types";
import { useEffect, useState } from "react";
import { handleGetSectors } from "../../server/proposalActions";
import { Sector } from "@/types";

const Step1GeneralInfo = ({
  formData,
  onSelectChange,
  onFormChange,
}: FormStepProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const result = await handleGetSectors();
        if (result.success) {
          setSectors(result.data || []);
        } else {
          setError(result.message || "Failed to fetch sectors");
        }
      } catch (error) {
        console.error("Error fetching sectors:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">General Information</h3>
          <p className="text-sm text-muted-foreground">
            Tell us about your project
          </p>
        </div>
      </div>

      {/* Project Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Project Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={onFormChange}
          placeholder="e.g., Clean Water Initiative"
          required
        />
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Project Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onFormChange}
          placeholder="Provide a detailed description of your project (min. 50 characters)"
          rows={5}
          required
        />
        <p className="text-xs text-muted-foreground">
          {formData.description.length}/50 characters minimum
        </p>
      </div>

      {/* Sector Selection */}
      <div className="space-y-2">
        <Label htmlFor="sector">
          Project Sector <span className="text-destructive">*</span>
        </Label>

        {loading ? (
          <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-muted-foreground">
              Loading sectors...
            </span>
          </div>
        ) : error ? (
          <div className="p-3 border border-destructive/50 rounded-md bg-destructive/10">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        ) : (
          <Select
            value={formData.sector}
            onValueChange={(value) => onSelectChange("sector", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.length === 0 ? (
                <div className="p-2 text-sm text-muted-foreground text-center">
                  No sectors available
                </div>
              ) : (
                sectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.id}>
                    {sector.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )}

        {formData.sector && sectors.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {sectors.find((s) => s.id === formData.sector)?.description}
          </p>
        )}
      </div>
    </Card>
  );
};

export default Step1GeneralInfo;
