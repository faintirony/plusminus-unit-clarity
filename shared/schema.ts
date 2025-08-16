import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const marketplaceEnum = pgEnum('marketplace_type', ['wildberries', 'ozon']);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
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

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  name: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  marginRub: true,
  marginPercent: true,
  isProfitable: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
