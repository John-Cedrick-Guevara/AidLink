"use server";

import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/supabaseServer";
import { createNotification } from "@/app/(private)/dashboard/(user)/server/notificationActions";

export async function uploadReceipt(
  formData: FormData
): Promise<{ success: boolean; key?: string; message?: string }> {
  try {
    const supabase = await createClient();
    const user = await getCurrentUser();

    // Extract data from FormData
    const file = formData.get("file") as File;
    const amount = Number(formData.get("amount"));
    const projectId = formData.get("projectId") as string;
    const sectorId = formData.get("sectorId") as string;

    if (!file || !amount || !projectId || !sectorId) {
      return { success: false, message: "Missing required fields" };
    }

    // Convert File to ArrayBuffer then to Uint8Array for Supabase
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    const path = `receipts/${sectorId}/${projectId}/${Date.now()}_${file.name}`;
    const { data: receiptUpload, error: errorUpload } = await supabase.storage
      .from("donations_receipts")
      .upload(path, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (errorUpload || !receiptUpload) {
      console.error("Upload error:", errorUpload);
      return {
        success: false,
        message: errorUpload?.message || "Upload failed",
      };
    }

    const { error: fundError } = await supabase.from("funds").insert({
      user: user?.id,
      project: projectId,
      sector: sectorId,
      amount: amount,
      method: "transfer",
      status: "pending",
      receipt_url: path,
    });

    if (fundError) {
      console.error("Fund insert error:", fundError);
      return {
        success: false,
        message: fundError.message || "Fund upload failed",
      };
    }

    // Fetch project details to notify the project owner
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("title, proposer")
      .eq("id", projectId)
      .single();

    if (!projectError && project?.proposer) {
      // Notify project owner about new donation
      await createNotification(
        project.proposer,
        "donation",
        "💰 New Donation Received!",
        `You received a donation of ₱${amount.toLocaleString()} for your project "${
          project.title
        }". The donation is pending confirmation.`
      );
    }

    return { success: true, message: "Upload successful", key: path };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
