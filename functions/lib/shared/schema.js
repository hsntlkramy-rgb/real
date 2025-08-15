"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyAnalysisSchema = exports.insertSavedSearchSchema = exports.insertFavoriteSchema = exports.insertUserInteractionSchema = exports.insertUserProfileSchema = exports.insertPropertySchema = exports.registerUserSchema = exports.loginUserSchema = exports.insertUserSchema = exports.savedSearches = exports.favorites = exports.userInteractions = exports.userProfiles = exports.properties = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    fullName: (0, pg_core_1.text)("full_name"),
    phone: (0, pg_core_1.text)("phone"),
    role: (0, pg_core_1.text)("role").notNull().default("user"), // 'user', 'agent', 'admin'
    avatar: (0, pg_core_1.text)("avatar"),
    isActive: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    createdAt: (0, pg_core_1.text)("created_at").notNull(),
    updatedAt: (0, pg_core_1.text)("updated_at").notNull(),
});
exports.properties = (0, pg_core_1.pgTable)("properties", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id), // Property owner
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    price: (0, pg_core_1.text)("price").notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
    country: (0, pg_core_1.text)("country").notNull(),
    city: (0, pg_core_1.text)("city"),
    address: (0, pg_core_1.text)("address"),
    propertyType: (0, pg_core_1.text)("property_type").notNull(), // 'apartment', 'house', 'villa', etc.
    bedrooms: (0, pg_core_1.integer)("bedrooms"),
    bathrooms: (0, pg_core_1.integer)("bathrooms"),
    area: (0, pg_core_1.text)("area"), // e.g., "120 sqm"
    images: (0, pg_core_1.json)("images").$type().notNull(),
    tags: (0, pg_core_1.json)("tags").$type().notNull(),
    amenities: (0, pg_core_1.json)("amenities").$type().default([]),
    personas: (0, pg_core_1.json)("personas").$type().notNull(),
    coordinates: (0, pg_core_1.json)("coordinates").$type(),
    contactUrl: (0, pg_core_1.text)("contact_url"),
    contactPhone: (0, pg_core_1.text)("contact_phone"),
    contactEmail: (0, pg_core_1.text)("contact_email"),
    status: (0, pg_core_1.text)("status").notNull().default("active"), // 'active', 'sold', 'rented', 'draft'
    isActive: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    createdAt: (0, pg_core_1.text)("created_at").notNull(),
    updatedAt: (0, pg_core_1.text)("updated_at").notNull(),
});
exports.userProfiles = (0, pg_core_1.pgTable)("user_profiles", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    sessionId: (0, pg_core_1.text)("session_id").notNull().unique(),
    remoteWorker: (0, pg_core_1.real)("remote_worker").notNull().default(0),
    family: (0, pg_core_1.real)("family").notNull().default(0),
    investor: (0, pg_core_1.real)("investor").notNull().default(0),
    retiree: (0, pg_core_1.real)("retiree").notNull().default(0),
    luxury: (0, pg_core_1.real)("luxury").notNull().default(0),
});
exports.userInteractions = (0, pg_core_1.pgTable)("user_interactions", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    sessionId: (0, pg_core_1.text)("session_id").notNull(),
    propertyId: (0, pg_core_1.integer)("property_id").notNull().references(() => exports.properties.id),
    action: (0, pg_core_1.text)("action").notNull(), // 'like' | 'pass' | 'view'
    timestamp: (0, pg_core_1.text)("timestamp").notNull(),
});
exports.favorites = (0, pg_core_1.pgTable)("favorites", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.users.id),
    propertyId: (0, pg_core_1.integer)("property_id").notNull().references(() => exports.properties.id),
    createdAt: (0, pg_core_1.text)("created_at").notNull(),
});
exports.savedSearches = (0, pg_core_1.pgTable)("saved_searches", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.users.id),
    searchParams: (0, pg_core_1.json)("search_params").notNull(),
    createdAt: (0, pg_core_1.text)("created_at").notNull(),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
    username: true,
    email: true,
    password: true,
    fullName: true,
    phone: true,
    role: true,
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
exports.registerUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    fullName: zod_1.z.string().min(1),
    phone: zod_1.z.string().optional(),
});
exports.insertPropertySchema = (0, drizzle_zod_1.createInsertSchema)(exports.properties).omit({
    id: true,
});
exports.insertUserProfileSchema = (0, drizzle_zod_1.createInsertSchema)(exports.userProfiles).omit({
    id: true,
});
exports.insertUserInteractionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.userInteractions).omit({
    id: true,
});
exports.insertFavoriteSchema = (0, drizzle_zod_1.createInsertSchema)(exports.favorites).omit({
    id: true,
});
exports.insertSavedSearchSchema = (0, drizzle_zod_1.createInsertSchema)(exports.savedSearches).omit({
    id: true,
});
exports.propertyAnalysisSchema = zod_1.z.object({
    description: zod_1.z.string(),
});
//# sourceMappingURL=schema.js.map