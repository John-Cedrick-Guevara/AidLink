import { useState } from "react";
import { toast } from "sonner";

interface SectorManagement {
  sectorList: string[];
  newSector: string;
  editingSector: string | null;
  editedSectorName: string;
  sectorDialogOpen: boolean;
  setNewSector: (value: string) => void;
  setEditedSectorName: (value: string) => void;
  setSectorDialogOpen: (value: boolean) => void;
  handleAddSector: () => void;
  handleDeleteSector: (sector: string) => void;
  handleEditSector: (sector: string) => void;
  handleSaveSector: () => void;
  handleCancelEdit: () => void;
}

export const useSectorManagement = (
  initialSectors: string[]
): SectorManagement => {
  const [sectorList, setSectorList] = useState(initialSectors);
  const [newSector, setNewSector] = useState("");
  const [editingSector, setEditingSector] = useState<string | null>(null);
  const [editedSectorName, setEditedSectorName] = useState("");
  const [sectorDialogOpen, setSectorDialogOpen] = useState(false);

  const handleAddSector = () => {
    if (!newSector.trim()) {
      toast.error("Please enter a sector name");
      return;
    }
    if (sectorList.includes(newSector)) {
      toast.error("Sector already exists");
      return;
    }
    setSectorList([...sectorList, newSector]);
    setNewSector("");
    toast.success(`Sector "${newSector}" added successfully`);
  };

  const handleDeleteSector = (sector: string) => {
    setSectorList(sectorList.filter((s) => s !== sector));
    toast.success(`Sector "${sector}" removed`);
  };

  const handleEditSector = (sector: string) => {
    setEditingSector(sector);
    setEditedSectorName(sector);
  };

  const handleSaveSector = () => {
    if (!editedSectorName.trim()) {
      toast.error("Sector name cannot be empty");
      return;
    }
    const updatedSectors = sectorList.map((s) =>
      s === editingSector ? editedSectorName : s
    );
    setSectorList(updatedSectors);
    setEditingSector(null);
    toast.success("Sector updated successfully");
  };

  const handleCancelEdit = () => {
    setEditingSector(null);
  };

  return {
    sectorList,
    newSector,
    editingSector,
    editedSectorName,
    sectorDialogOpen,
    setNewSector,
    setEditedSectorName,
    setSectorDialogOpen,
    handleAddSector,
    handleDeleteSector,
    handleEditSector,
    handleSaveSector,
    handleCancelEdit,
  };
};
