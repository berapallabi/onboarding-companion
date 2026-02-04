
import { db } from '@/db';
import { documents } from '@/db/schema';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

export default async function ConnectPage() {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const peopleDocs = await db.select().from(documents).where(eq(documents.category, 'people'));

    // Mock representation of people from the docs content
    const people = [
        { name: "Sarah Chen", role: "Lead Engineer", specialty: "Backend & Architecture", icon: "👩‍💻" },
        { name: "Elena Rodriguez", role: "Lead Designer", specialty: "UI & Design System", icon: "🎨" },
        { name: "Marcus Thorne", role: "Product Manager", specialty: "Roadmap & Strategy", icon: "📋" },
        { name: "Jamie Loo", role: "HR & Admin", specialty: "Culture & Benefits", icon: "🏢" }
    ];

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h1 className="text-3xl font-bold">Team Peer Connections</h1>
                </div>

                <p className="text-muted-foreground mb-8">
                    Meet the team members who will help you succeed. Connect with them for specific topics or just to say hi!
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                    {people.map((person) => (
                        <div key={person.name} className="glass-card p-6 flex items-start gap-4 hover:border-primary/50 transition-all">
                            <div className="text-4xl bg-muted rounded-xl p-3">{person.icon}</div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold">{person.name}</h3>
                                <p className="text-primary text-sm font-semibold mb-2">{person.role}</p>
                                <p className="text-sm text-muted-foreground mb-4">Expert in: {person.specialty}</p>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/companion?q=Who is ${person.name} and how can they help me?`}
                                        className="text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                                    >
                                        BIO & CONTEXT
                                    </Link>
                                    <button className="text-xs font-bold border border-border px-3 py-1.5 rounded-full hover:bg-muted transition-colors">
                                        BOOK 1:1
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 glass-card border-dashed border-2 border-primary/30 text-center">
                    <h2 className="text-xl font-bold mb-4">Need a personal introduction?</h2>
                    <p className="text-muted-foreground mb-6">
                        Ask your AI Companion to draft a friendly Slack message to any team member.
                    </p>
                    <Link href="/companion?q=Help me draft a Slack intro to Sarah Chen" className="btn-primary inline-block">
                        Draft My Intro →
                    </Link>
                </div>
            </div>
        </div>
    );
}
