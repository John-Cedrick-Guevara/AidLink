"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, Trash2, Edit } from "lucide-react";
import { Sector } from "@/types";
import AddSectorDialog from "../dialogs/sector/AddSectorDialog";
import EditSectorDialog from "../dialogs/sector/EditSectorDialog";
import DeleteSectorDialog from "../dialogs/sector/DeleteSectorDialog";

interface SectorsManagementTabProps {
  sectors: Sector[];
}

const SectorsManagementTab = ({ sectors }: SectorsManagementTabProps) => {
  // Edit Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSector, setEditingSector] = useState<Sector | null>(null);

  // Delete Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingSector, setDeletingSector] = useState<Sector | null>(null);

  // Open Edit Dialog
  const openEditDialog = (sector: Sector) => {
    setEditingSector(sector);
    setEditDialogOpen(true);
  };

  // Open Delete Dialog
  const openDeleteDialog = (sector: Sector) => {
    setDeletingSector(sector);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sector Management</h2>

        {/* Add Sector Dialog */}
        <AddSectorDialog />
      </div>

      {/* Sectors Grid */}
      <Card className="glass-card p-6">
        {sectors.length === 0 ? (
          <div className="text-center py-12">
            <Settings className="w-12 h-12 mx-auto mb-3 opacity-50 text-muted-foreground" />
            <p className="text-muted-foreground font-medium">
              No sectors found
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Click "Add Sector" to create your first sector
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((sector) => (
              <Card
                key={sector.id}
                className="p-4 hover:shadow-md transition-all border-border/50 group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Settings className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold text-base">
                      {sector.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(sector)}
                      className="h-8 w-8 p-0"
                      title="Edit sector"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openDeleteDialog(sector)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      title="Delete sector"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {sector.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {sector.description}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Edit Sector Dialog */}
      <EditSectorDialog
        sector={editingSector}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteSectorDialog
        sector={deletingSector}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
};

export default SectorsManagementTab;
