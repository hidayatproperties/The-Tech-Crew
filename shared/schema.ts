import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(true),
});

// Real Estate Properties
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type"), // 'buy' or 'rent'
  location: text("location"),
  price: integer("price"),
  imageUrl: text("image_url"),
  images: text("images").array().notNull().default([]),
  specs: jsonb("specs").$type<{ bedrooms?: number; bathrooms?: number; area?: number }>(),
  features: text("features").array(),
  isFeatured: boolean("is_featured").default(false),
});

// Car Rentals
export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"), // 'economy', 'luxury', '4x4'
  pricePerDay: integer("price_per_day"),
  imageUrl: text("image_url"),
  images: text("images").array().notNull().default([]),
  isAvailable: boolean("is_available").default(true),
  features: text("features").array(),
  description: text("description"),
});

// Enquiries (Contact Form)
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  type: text("type").notNull(), // 'general', 'all-services', 'real-estate', 'company-formation', 'marketing', 'car-rental'
  status: text("status").default("new"), // 'new', 'read', 'archived'
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users);
export const insertPropertySchema = createInsertSchema(properties, {
  images: z.array(z.string()).default([]),
  price: z.preprocess((val) => (val === "" || val === undefined || val === null ? null : Number(val)), z.number().nullable().optional())
});
export const insertCarSchema = createInsertSchema(cars, {
  images: z.array(z.string()).default([])
});
export const insertEnquirySchema = createInsertSchema(enquiries);

// Types
export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type Car = typeof cars.$inferSelect;
export type Enquiry = typeof enquiries.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type InsertCar = z.infer<typeof insertCarSchema>;
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
