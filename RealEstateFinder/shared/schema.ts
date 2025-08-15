import { pgTable, text, serial, integer, boolean, json, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  phone: text("phone"),
  role: text("role").notNull().default("user"), // 'user', 'agent', 'admin'
  avatar: text("avatar"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // Property owner
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  location: text("location").notNull(),
  country: text("country").notNull(),
  city: text("city"),
  address: text("address"),
  propertyType: text("property_type").notNull(), // 'apartment', 'house', 'villa', etc.
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  area: text("area"), // e.g., "120 sqm"
  images: json("images").$type<string[]>().notNull(),
  tags: json("tags").$type<string[]>().notNull(),
  amenities: json("amenities").$type<string[]>().default([]),
  personas: json("personas").$type<{
    remoteWorker: number;
    family: number;
    investor: number;
    retiree: number;
    luxury: number;
  }>().notNull(),
  coordinates: json("coordinates").$type<{ lat: number; lng: number }>(),
  contactUrl: text("contact_url"),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  status: text("status").notNull().default("active"), // 'active', 'sold', 'rented', 'draft'
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  remoteWorker: real("remote_worker").notNull().default(0),
  family: real("family").notNull().default(0),
  investor: real("investor").notNull().default(0),
  retiree: real("retiree").notNull().default(0),
  luxury: real("luxury").notNull().default(0),
});

export const userInteractions = pgTable("user_interactions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  action: text("action").notNull(), // 'like' | 'pass' | 'view'
  timestamp: text("timestamp").notNull(),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  createdAt: text("created_at").notNull(),
});

export const savedSearches = pgTable("saved_searches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  searchParams: json("search_params").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  fullName: true,
  phone: true,
  role: true,
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const registerUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
  phone: z.string().optional(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
});

export const insertUserInteractionSchema = createInsertSchema(userInteractions).omit({
  id: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
});

export const insertSavedSearchSchema = createInsertSchema(savedSearches).omit({
  id: true,
});

export const propertyAnalysisSchema = z.object({
  description: z.string(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserInteraction = typeof userInteractions.$inferSelect;
export type InsertUserInteraction = z.infer<typeof insertUserInteractionSchema>;
export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type SavedSearch = typeof savedSearches.$inferSelect;
export type InsertSavedSearch = z.infer<typeof insertSavedSearchSchema>;
