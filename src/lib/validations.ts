import { z } from "zod";

// Comment validation schemas
export const CommentSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must be less than 1000 characters")
    .trim(),
});

export const EditCommentSchema = z.object({
  commentId: z.string().uuid("Invalid comment ID"),
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must be less than 1000 characters")
    .trim(),
});

export const DeleteCommentSchema = z.object({
  commentId: z.string().uuid("Invalid comment ID"),
  userId: z.string().uuid("Invalid user ID"),
});

// Rating validation schemas
export const RatingSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

// Project validation schemas
export const CreateProjectSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(5000, "Description must be less than 5000 characters")
    .trim(),
  goal_amount: z
    .number()
    .positive("Goal amount must be positive")
    .min(100, "Goal amount must be at least 100")
    .max(1000000000, "Goal amount is too large"),
  sector_id: z.string().uuid("Invalid sector ID"),
  tags: z.array(z.string()).optional(),
});

export const UpdateProjectStatusSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  status: z.enum(["pending", "approved", "rejected", "completed"], {
    message: "Invalid status",
  }),
});

// Donation validation schema
export const CreateDonationSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  amount: z
    .number()
    .positive("Donation amount must be positive")
    .min(1, "Minimum donation is 1")
    .max(1000000, "Donation amount is too large"),
  sectorId: z.string().uuid("Invalid sector ID").optional(),
});

// User validation schemas
export const UpdateUserProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim()
    .optional(),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .trim()
    .optional(),
  avatar_url: z.string().url("Invalid URL").optional(),
});

// Type exports for convenience
export type CommentInput = z.infer<typeof CommentSchema>;
export type EditCommentInput = z.infer<typeof EditCommentSchema>;
export type DeleteCommentInput = z.infer<typeof DeleteCommentSchema>;
export type RatingInput = z.infer<typeof RatingSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectStatusInput = z.infer<
  typeof UpdateProjectStatusSchema
>;
export type CreateDonationInput = z.infer<typeof CreateDonationSchema>;
export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfileSchema>;

// ============================================================================
// Shared Validation Utilities (Non-Zod)
// ============================================================================

/**
 * Regular expressions for common validations
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHILIPPINE_PHONE_REGEX = /^(09|\+639)\d{9}$/;

/**
 * Email validation utilities
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const validateEmailWithError = (
  email: string
): { valid: boolean; error?: string } => {
  if (!email.trim()) {
    return { valid: false, error: "Please enter your email address" };
  }

  if (!validateEmail(email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  return { valid: true };
};

/**
 * Amount validation utilities
 */
export interface AmountValidationOptions {
  minAmount?: number;
  maxAmount?: number;
  customMinError?: string;
  customMaxError?: string;
}

export const validateAmount = (
  amount: string | number,
  options: AmountValidationOptions = {}
): { valid: boolean; error?: string } => {
  const {
    minAmount = 50,
    maxAmount = Infinity,
    customMinError,
    customMaxError,
  } = options;

  const numAmount = typeof amount === "string" ? Number(amount) : amount;

  if (typeof amount === "string" && (!amount || isNaN(numAmount))) {
    return { valid: false, error: "Please enter a valid amount" };
  }

  if (numAmount <= 0) {
    return { valid: false, error: "Amount must be greater than ₱0" };
  }

  if (numAmount < minAmount) {
    return {
      valid: false,
      error:
        customMinError || `Minimum amount is ₱${minAmount.toLocaleString()}`,
    };
  }

  if (numAmount > maxAmount) {
    return {
      valid: false,
      error:
        customMaxError || `Maximum amount is ₱${maxAmount.toLocaleString()}`,
    };
  }

  return { valid: true };
};

/**
 * Phone number validation utilities
 */
export const validatePhoneNumber = (
  phone: string,
  required = false
): { valid: boolean; error?: string } => {
  if (!phone.trim()) {
    if (required) {
      return { valid: false, error: "Phone number is required" };
    }
    return { valid: true };
  }

  const cleanedPhone = phone.replace(/\s/g, "");
  if (!PHILIPPINE_PHONE_REGEX.test(cleanedPhone)) {
    return {
      valid: false,
      error: "Please enter a valid Philippine phone number (09XXXXXXXXX)",
    };
  }

  return { valid: true };
};

/**
 * Name validation utilities
 */
export const validateName = (
  name: string
): { valid: boolean; error?: string } => {
  if (!name.trim()) {
    return { valid: false, error: "Please enter your name" };
  }

  if (name.trim().length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }

  return { valid: true };
};
