"use client";

import { useState, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building2, Copy, Check, Upload, X, FileImage } from "lucide-react";
import { toast } from "sonner";
import { BankAccount } from "@/app/(private)/proposal-form/types";


interface BankAccountListProps {
  bankAccounts: BankAccount[];
  onFileSelect?: (file: File | null) => void;
}

export const BankAccountList = ({
  bankAccounts,
  onFileSelect,
}: BankAccountListProps) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyAccount = useCallback((accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);

    toast.success("Account number copied!", {
      description: "Paste it in your banking app",
    });

    setTimeout(() => setCopiedAccount(null), 2000);
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description: "Please upload an image (JPG, PNG, WEBP) or PDF file",
        });
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File too large", {
          description: "Please upload a file smaller than 5MB",
        });
        return;
      }

      
      setSelectedFile(file);
      onFileSelect?.(file);
      console.log(file)

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }

      toast.success("Receipt uploaded!", {
        description: file.name,
      });
    },
    [onFileSelect]
  );

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onFileSelect?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Receipt removed");
  }, [onFileSelect]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  if (bankAccounts.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No bank accounts available for this project yet.
        </p>
      </Card>
    );
  }
  return (
    <>
      <p className="text-sm text-muted-foreground">
        Transfer your donation to one of these verified bank accounts:
      </p>

      <div className="space-y-3">
        {bankAccounts.map((account) => (
          <Card
            key={account.id}
            className="p-4 hover:shadow-md transition-all hover:border-primary/50"
          >
            <div className="space-y-3">
              {/* Bank Name Header */}
              <div className="flex items-center gap-2 pb-2 border-b">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-base">{account.bank_name}</h4>
              </div>

              {/* Account Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">
                    Account Name:
                  </span>
                  <span className="font-medium text-right">
                    {account.account_name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">
                    Account Number:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold">
                      {account.account_number}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 hover:bg-primary/10"
                      onClick={() => handleCopyAccount(account.account_number)}
                      aria-label={`Copy ${account.bank_name} account number`}
                    >
                      {copiedAccount === account.account_number ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* File Upload Section */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="space-y-3">
          <Label htmlFor="receipt-upload" className="text-sm font-semibold">
            Upload Proof of Payment
          </Label>

          <input
            ref={fileInputRef}
            id="receipt-upload"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {!selectedFile ? (
            <Button
              type="button"
              variant="outline"
              className="w-full h-24 border-dashed border-2 hover:bg-primary/5 hover:border-primary"
              onClick={handleUploadClick}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload receipt</p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, WEBP or PDF (max 5MB)
                  </p>
                </div>
              </div>
            </Button>
          ) : (
            <div className="relative border-2 border-primary/20 rounded-lg p-3 bg-background">
              <div className="flex items-start gap-3">
                {previewUrl ? (
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                    <img
                      src={previewUrl}
                      alt="Receipt preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center shrink-0">
                    <FileImage className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 shrink-0"
                  onClick={handleRemoveFile}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            📸 Upload a clear photo of your bank transfer receipt or screenshot
          </p>
        </div>
      </Card>

      {/* Instructions Card */}
      <Card className="p-4 bg-warning/5 border-warning/30">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">📌</span>
            <h5 className="font-semibold text-sm">Important Instructions</h5>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 ml-7">
            <li>• Transfer the exact amount to one of the listed accounts</li>
            <li>• Take a clear photo or screenshot of the receipt</li>
            <li>• Upload the proof of payment above for faster verification</li>
            <li>
              • Your donation will be credited within 24-48 hours after
              verification
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};
