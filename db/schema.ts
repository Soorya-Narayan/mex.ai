import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Minimal columns stored for DPDP Act 2023 data-minimization compliance.
 * The application connects using a least-privilege Postgres role granted INSERT on `leads` only.
 */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  company: varchar("company", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  productInterest: varchar("product_interest", { length: 80 }).notNull(),
  message: text("message").notNull(),
  consent: boolean("consent").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type NewLead = typeof leads.$inferInsert;
export type Lead = typeof leads.$inferSelect;

