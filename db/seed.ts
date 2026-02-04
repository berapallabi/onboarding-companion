
import 'dotenv/config';
import { db } from "./index";
import { documents, milestones } from "./schema";
import { DEFAULT_MILESTONES } from "../lib/constants";

async function seed() {
    console.log("🌱 Seeding knowledge base...");

    const docs = [
        {
            title: "VPN Configuration Guide",
            content: "To connect to the corporate network, download the Engineering-US VPN client. Use your SSO credentials and ensure your MFA is active. Contact IT support via #it-help for activation issues.",
            category: "it",
            url: "https://notion.so/vpn-setup"
        },
        {
            title: "Auth Service Architecture",
            content: "The Auth Service is a Node.js microservice handling JWT authentication and OAuth2. It uses Redis for session caching and PostgreSQL for user persistence. Source code: github.com/company/auth-service",
            category: "engineering",
            url: "https://notion.so/auth-service"
        },
        {
            title: "Git Workflow & PR Guidelines",
            content: "We use a trunk-based development model. All PRs require at least 2 approvals and a green build. Use 'feature/' or 'fix/' prefixes for branches.",
            category: "engineering",
            url: "https://notion.so/git-workflow"
        },
        {
            title: "Engineering Onboarding Buddy Program",
            content: "Every new hire is assigned a buddy (e.g., Sarah Chen for this session). Buddies help with technical setup, code reviews, and navigating team culture during the first 4 weeks.",
            category: "hr",
            url: "https://notion.so/buddy-program"
        },
        {
            title: "Engineering Team Directory",
            content: "Meet the team! Sarah Chen (Lead Engineer), Marcus Thorne (Product Manager), Elena Rodriguez (Lead Designer). Most team discussions happen in #product-engineering.",
            category: "people",
            url: "https://notion.so/team-directory"
        },
        {
            title: "Who to Talk to for What",
            content: "Backend/Architecture: Sarah Chen. UI/Design System: Elena Rodriguez. Product Roadmap/Prd: Marcus Thorne. HR/Admin: Jamie Loo.",
            category: "people",
            url: "https://notion.so/who-to-talk-to"
        }
    ];

    for (const doc of docs) {
        await db.insert(documents).values(doc).onConflictDoNothing();
    }

    console.log("🌱 Clearing and re-seeding global milestones...");
    try {
        await db.delete(milestones);
    } catch (e) {
        console.log("Milestones table might be empty or missing, ignoring error.");
    }

    for (const [role, items] of Object.entries(DEFAULT_MILESTONES)) {
        for (const m of items) {
            await db.insert(milestones).values({
                title: m.title,
                description: m.description,
                week: m.week,
                estimatedTime: m.estimatedTime,
                roleTarget: role === 'general' ? null : role
            }).onConflictDoNothing();
        }
    }

    console.log("✅ Seeding complete!");
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
