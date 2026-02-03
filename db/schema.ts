
import {
    pgTable,
    text,
    timestamp,
    boolean,
    uuid,
    integer,
    jsonb,
    primaryKey
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    role: text("role"), // 'engineering', 'design', 'product', 'marketing'
    seniority: text("seniority"), // 'junior', 'mid', 'senior'
    onboardingStartDate: timestamp("onboarding_start_date"),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        primaryKey({ columns: [account.provider, account.providerAccountId] })
    ]
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
        primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }),
    ]
);

// App Specific Tables

export const assessments = pgTable("assessment", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    seniority: text("seniority").notNull(),
    skills: jsonb("skills").$type<string[]>(),
    goals: text("goals"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const milestones = pgTable("milestone", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    week: integer("week").notNull(),
    roleTarget: text("role_target"), // null means all roles
    estimatedTime: integer("estimated_time"), // minutes
});

export const userProgress = pgTable("user_progress", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    milestoneId: uuid("milestoneId")
        .notNull()
        .references(() => milestones.id, { onDelete: "cascade" }),
    completed: boolean("completed").default(false),
    completedAt: timestamp("completed_at"),
});
