
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
        },
        {
            title: "Design System Tokens",
            content: "Our design tokens are stored in Figma and exported via Style Dictionary. Colors: Primary Blue (#1e40af), Background Dark (#0f0f19). Typography: Inter for UI, Outfit for Headers.",
            category: "design",
            url: "https://notion.so/design-tokens"
        },
        {
            title: "Product Roadmap Q3-Q4",
            content: "Our main focus for the rest of the year is 'Global Expansion' and 'AI Integration'. We are launching the localized versions in October and the GPT-4 based companion in December.",
            category: "product",
            url: "https://notion.so/roadmap"
        },
        {
            title: "Marketing Campaign Tone",
            content: "Our brand voice is 'Expert yet approachable'. Avoid jargon where possible. Focus on 'Empowerment' and 'Clarity'. Review the voice-and-tone.pdf for examples.",
            category: "marketing",
            url: "https://notion.so/marketing-tone"
        },
        {
            title: "Data Ethics & Privacy",
            content: "We strictly follow GDPR and CCPA guidelines. No PII should ever be logged in plain text. Always use our internal hashing service for user identifiers.",
            category: "it",
            url: "https://notion.so/privacy"
        }
    ];

    for (const doc of docs) {
        await db.insert(documents).values(doc).onConflictDoNothing();
    }

    console.log("🌱 Clearing and re-seeding global milestones...");
    await db.delete(milestones);
    for (const [role, list] of Object.entries(DEFAULT_MILESTONES)) {
        for (const m of list) {
            await db.insert(milestones).values({
                title: m.title,
                description: m.description,
                week: m.week,
                estimatedTime: m.estimatedTime,
                roleTarget: role === 'general' ? null : role,
                skillTarget: m.skillTarget || null
            }).onConflictDoNothing();
        }
    }

    console.log("✅ Seeding complete!");
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
