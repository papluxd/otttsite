import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  price1MonthActual: integer("price_1_month_actual").notNull(),
  price1MonthSelling: integer("price_1_month_selling").notNull(),
  price3MonthActual: integer("price_3_month_actual").notNull(),
  price3MonthSelling: integer("price_3_month_selling").notNull(),
  price6MonthActual: integer("price_6_month_actual").notNull(),
  price6MonthSelling: integer("price_6_month_selling").notNull(),
  price12MonthActual: integer("price_12_month_actual").notNull(),
  price12MonthSelling: integer("price_12_month_selling").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
