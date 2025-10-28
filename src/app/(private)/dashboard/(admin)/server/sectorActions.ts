"use server";
import { createClient } from "@/lib/supabase/supabaseServer";
import { Sector } from "@/types";

export async function getAllSectorsForAdmin(): Promise<Sector[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("sectors").select("*");

    if (error) {
      console.error("Error fetching sectors:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching sectors:", error);
    return [];
  }
}

export async function createNewSector(prev: unknown, formData: FormData) {
  const supabase = await createClient();

  const sectorName = formData.get("sectorName") as string;
  const sectorDescription = formData.get("sectorDescription") as string;

  // Validation
  if (!sectorName || !sectorDescription) {
    return {
      success: false,
      message: "Sector name and description are required",
    };
  }

  if (sectorName.trim().length < 3) {
    return {
      success: false,
      message: "Sector name must be at least 3 characters",
    };
  }

  const { data, error } = await supabase
    .from("sectors")
    .insert([
      { title: sectorName.trim(), description: sectorDescription.trim() },
    ]);

  if (error) {
    console.error("Error creating sector:", error);
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: `Sector "${sectorName}" created successfully`,
  };
}

export async function editSector(prev: unknown, formData: FormData) {
  const supabase = await createClient();

  const sectorId = formData.get("sectorId") as string;
  const sectorName = formData.get("sectorName") as string;
  const sectorDescription = formData.get("sectorDescription") as string;

  // Validation
  if (!sectorId || !sectorName || !sectorDescription) {
    return { success: false, message: "All fields are required" };
  }

  if (sectorName.trim().length < 3) {
    return {
      success: false,
      message: "Sector name must be at least 3 characters",
    };
  }

  const { data, error } = await supabase
    .from("sectors")
    .update({
      title: sectorName.trim(),
      description: sectorDescription.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", sectorId);

  if (error) {
    console.error("Error editing sector:", error);
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: `Sector "${sectorName}" updated successfully`,
  };
}

export async function deleteSector(prev: unknown, sectorId: string) {
  const supabase = await createClient();
  console.log(sectorId);
  const { data, error } = await supabase
    .from("sectors")
    .delete()
    .eq("id", sectorId);

  if (error) {
    console.error("Error deleting sector:", error);
    return { success: false, message: error.message };
  }

  return { success: true, message: "Sector deleted successfully" };
}
