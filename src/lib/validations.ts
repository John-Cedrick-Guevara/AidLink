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
