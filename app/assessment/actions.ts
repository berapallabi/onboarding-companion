'use server';

import 'dotenv/config'; // Ensure env is loaded for direct calls if any

import { auth } from "@/auth";
import { db } from "@/db";
import { assessments, users, milestones, userProgress } from "@/db/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, or, isNull } from "drizzle-orm";

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

    // Clear old progress to avoid stale IDs or duplicates
    await db.delete(userProgress).where(eq(userProgress.userId, session.user.id));

    // Generate Milestones
    // We query the seeded milestones table instead of creating new ones
    const relevantMilestones = await db.select()
        .from(milestones)
        .where(
            or(
                eq(milestones.roleTarget, role),
                isNull(milestones.roleTarget)
            )
        );

    // Create progress entries
    for (const m of relevantMilestones) {
        await db.insert(userProgress).values({
            userId: session.user.id,
            milestoneId: m.id,
            completed: false
        });
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}
