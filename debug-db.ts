
import 'dotenv/config';
import { db } from "./db/index";
import { milestones, users, userProgress, assessments } from "./db/schema";
import { count, eq } from "drizzle-orm";

async function debug() {
    const milestoneCount = await db.select({ value: count() }).from(milestones);
    const userCount = await db.select({ value: count() }).from(users);
    const progressCount = await db.select({ value: count() }).from(userProgress);
    const assessmentCount = await db.select({ value: count() }).from(assessments);

    console.log("--- DB STATUS ---");
    console.log("Milestones in catalog:", milestoneCount[0].value);
    console.log("Users in system:", userCount[0].value);
    console.log("User Progress entries:", progressCount[0].value);
    console.log("Assessments completed:", assessmentCount[0].value);

    const allMS = await db.select().from(milestones);
    console.log("\n--- MILIESTONES CATALOG ---");
    allMS.forEach(m => console.log(`Title: ${m.title} | RoleTarget: ${m.roleTarget}`));

    const firstUser = await db.query.users.findFirst();
    if (firstUser) {
        console.log("\nSample User:", firstUser.id, "| Role:", firstUser.role);
        const userAssessment = await db.query.assessments.findFirst({
            where: eq(assessments.userId, firstUser.id)
        });
        console.log("Assessment Role:", userAssessment?.role);

        const userGoals = await db.select().from(userProgress).where(eq(userProgress.userId, firstUser.id));
        console.log("Actual milestones linked to user:", userGoals.length);
    }
}

debug().catch(console.error);
