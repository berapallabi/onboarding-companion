
import { auth } from "@/auth";
import { db } from "@/db";
import { milestones, userProgress, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import DashboardView, { Milestone } from "./view";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect('/api/auth/signin');
    }

    const userId = session.user.id;

    // Fetch User
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });

    if (!user) {
        // Handle edge case: User logged in but record missing? 
        // Or if using NextAuth default tables, maybe we need to ensure fields exist.
        redirect('/');
    }

    // Fetch Milestones and Progress
    // We want all milestones relevant to the user's role (or generated ones).
    // In our simplified 'saveAssessment' flow, we created userProgress entries for all relevant milestones.
    // So we can query 'userProgress' and join 'milestones'.

    // Drizzle query API
    const progress = await db.query.userProgress.findMany({
        where: eq(userProgress.userId, userId),
        with: {
            // Relation needs to be defined in schema for 'with' to work. 
            // I defined foreign keys in schema.ts, but did I define relations?
            // I did NOT define `relations()` in schema.ts.
            // So I cannot use `with`. I must use joins or separate queries.
        }
    });

    // Since I didn't set up drizzle relations yet, let's fetch milestones manually if needed or update schema.
    // Let's implement manual join logic for MVP robustness without touching schema refactor right now.

    // 1. Get all progress items
    // 2. Get milestone details for these items

    const progressIds = progress.map(p => p.milestoneId);

    let userMilestones: Milestone[] = [];

    if (progressIds.length > 0) {
        // Fetch milestone details
        // In Drizzle, 'inArray' is efficient.
        // const milestoneDetails = await db.select().from(milestones).where(inArray(milestones.id, progressIds));

        // Let's rely on `db.query.milestones.findMany` but I need `inArray` operator.
        // It's cleaner to just join.

        const results = await db
            .select({
                id: milestones.id,
                title: milestones.title,
                description: milestones.description,
                estimatedTime: milestones.estimatedTime,
                week: milestones.week,
                completed: userProgress.completed,
                progressId: userProgress.id
            })
            .from(userProgress)
            .innerJoin(milestones, eq(userProgress.milestoneId, milestones.id))
            .where(eq(userProgress.userId, userId));

        userMilestones = results.map(r => ({
            id: r.id, // Using milestone ID as the key for toggling. 
            // But wait, my action uses 'milestoneId' to find progress.
            // My view expects 'id' to pass to toggle.
            // So if I pass milestone.id, the action works.
            title: r.title,
            description: r.description || '',
            estimatedTime: r.estimatedTime || 0,
            week: r.week,
            completed: r.completed || false
        }));
    }

    return (
        <DashboardView
            profile={{
                role: user.role || 'member',
                seniority: user.seniority || 'mid',
                name: user.name,
                skills: user.skills || []
            }}
            initialMilestones={userMilestones}
        />
    );
}
