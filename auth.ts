
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({

    adapter: DrizzleAdapter(db, {
        usersTable: users,
        // @ts-expect-error Type mismatch
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [
        GitHub,
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                // Fetch role from db if needed, though adapter usually handles basic user fields.
                // We might need to extend the session type to include role/seniority if we add them to the User type in NextAuth
            }
            return session;
        },
    },
});
