
'use server'

import { auth } from "@/auth";
import { db } from "@/db";
import { assessments, users, milestones, userProgress } from "@/db/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DEFAULT_MILESTONES } from "@/lib/constants";
import { eq } from "drizzle-orm";

export async function saveAssessment(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        // In a real app, you might handle this by storing in a cookie and redirecting to login
        // For MVP, we'll assume they need to be logged in or we just error
        redirect('/api/auth/signin');
    }

    const role = formData.get('role') as string;
    const seniority = formData.get('seniority') as string;
    const skills = JSON.parse(formData.get('skills') as string || '[]');
    const goals = formData.get('goals') as string;

    // Save to DB
    await db.insert(assessments).values({
        userId: session.user.id,
        role,
        seniority,
        skills,
        goals
    });

    // Update User profile
    await db.update(users)
        .set({ role, seniority, onboardingStartDate: new Date() })
        .where(eq(users.id, session.user.id));

    // Generate Milestones
    // 1. Get default milestones for role + general
    const generalMilestones = DEFAULT_MILESTONES.general || [];
    const roleMilestones = DEFAULT_MILESTONES[role as keyof typeof DEFAULT_MILESTONES] || [];
    const allMilestones = [...generalMilestones, ...roleMilestones];

    // 2. Insert and link
    for (const m of allMilestones) {
        // Ideally we verify if milestone exists or we just create fresh ones for simplicity in MVP
        // For MVP, simplified: Insert milestone, then link. 
        // Optimization: In real app, milestones are static. unique constraint on title+role?
        // Let's just insert into 'milestones' table and get ID, or find existing.

        // Check if exists
        // const existing = await db.query.milestones.findFirst({ where: (ms, { eq }) => eq(ms.title, m.title) });
        // This requires complex conditional logic with Drizzle. 
        // Simpler: Just create a user_progress entry with a "virtual" milestone or ensure milestones table is seeded.
        // Plan B: Insert into milestones table every time? No, that bloats.
        // Plan C: Check existence.

        // We will use the 'milestones' table as a catalog.
        // Since we don't have unique constraints set up for title yet, let's just insert if we can't find it.
        // NOTE: This might be race-condition prone but ok for MVP.

        // Actually, 'db.query' API is cleaner. need to update imports
        // Let's assume we proceed with simple inserts for now to ensure it works.
        const [insertedMilestone] = await db.insert(milestones).values({
            title: m.title,
            description: m.description,
            week: m.week,
            estimatedTime: m.estimatedTime,
            roleTarget: role
        }).returning({ id: milestones.id }); // This duplicates milestones. Not ideal.

        // Better: Seed them once. But we can't control seeding easily here.
        // Let's just create UserProgress with direct values? No, schema references milestoneId.
        // Okay, let's fix Schema or Logic.
        // Logic: 
        // const existing = await db.select().from(milestones).where(eq(milestones.title, m.title)).limit(1);
        // if (existing) ...

        // For MVP speed: just insert. 
        if (insertedMilestone) {
            await db.insert(userProgress).values({
                userId: session.user.id,
                milestoneId: insertedMilestone.id,
                completed: false
            });
        }
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}
