import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  integer,
  decimal,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const marketplaceEnum = pgEnum("marketplace_type", [
  "wildberries",
  "ozon",
]);

export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const stores = pgTable("stores", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  marketplace: marketplaceEnum("marketplace").notNull(),
  name: text("name").notNull(),
  apiToken: text("api_token").notNull(), // Encrypted
  isActive: boolean("is_active").default(true),
  lastValidatedAt: timestamp("last_validated_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  storeId: varchar("store_id")
    .references(() => stores.id),
  marketplace: marketplaceEnum("marketplace").notNull(),
  sku: text("sku").notNull(),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  currentPrice: integer("current_price"), // в копейках
  costPrice: integer("cost_price"), // в копейках
  commission: integer("commission"), // в копейках
  logisticsCost: integer("logistics_cost"), // в копейках
  advertisingCost: integer("advertising_cost"), // в копейках
  marginRub: integer("margin_rub"), // рассчитываемое поле
  marginPercent: decimal("margin_percent", { precision: 5, scale: 2 }), // рассчитываемое поле
  isProfitable: boolean("is_profitable"), // рассчитываемое поле
  isActive: boolean("is_active").default(true),
  lastSyncedAt: timestamp("last_synced_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email("Некорректный формат email").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Некорректный формат email"),
  password: z.string().min(8, "Минимум 8 символов").regex(/\d/, "Пароль должен содержать хотя бы одну цифру"),
});

export const loginSchema = z.object({
  email: z.string().email("Некорректный формат email"),
  password: z.string().min(1, "Пароль обязателен"),
});

export const addStoreSchema = z.object({
  name: z.string().min(1, "Название магазина обязательно"),
  marketplace: z.enum(["wildberries", "ozon"]),
  apiToken: z.string().min(1, "API токен обязателен"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  passwordHash: true,
  name: true,
});

export const insertStoreSchema = createInsertSchema(stores).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  marginRub: true,
  marginPercent: true,
  isProfitable: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type AddStoreData = z.infer<typeof addStoreSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type User = typeof users.$inferSelect;
export type Store = typeof stores.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Product = typeof products.$inferSelect;
