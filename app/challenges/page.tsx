
import Link from 'next/link';
import KnowledgeCheck from '@/components/KnowledgeCheck';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ChallengesPage() {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h1 className="text-3xl font-bold">Training Room & Quests</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="p-2 bg-primary/20 rounded-lg">🎯</span>
                                Current Challenge
                            </h2>
                            <KnowledgeCheck />
                        </section>

                        <section className="glass-card p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="p-2 bg-secondary/20 rounded-lg">🔥</span>
                                Weekly Streaks
                            </h2>
                            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl">
                                <div className="text-center">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Current</div>
                                    <div className="text-2xl font-black italic">0 DAYS</div>
                                </div>
                                <div className="h-8 w-[1px] bg-border"></div>
                                <div className="text-center">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Record</div>
                                    <div className="text-2xl font-black italic">3 DAYS</div>
                                </div>
                                <div className="h-8 w-[1px] bg-border"></div>
                                <div className="text-center">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Rank</div>
                                    <div className="text-2xl font-black italic">ROOKIE</div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="glass-card p-6">
                            <h2 className="text-xl font-bold mb-6">Quest Log</h2>
                            <div className="space-y-4">
                                {[
                                    { title: "The Documentarian", desc: "Read 5 basic engineering docs", prog: 60, xp: 50 },
                                    { title: "Social Butterfly", desc: "Schedule three 1-on-1 chats", prog: 33, xp: 100 },
                                    { title: "First PR", desc: "Successfully merge a 'dodo' PR", prog: 0, xp: 250 },
                                ].map((quest) => (
                                    <div key={quest.title} className="p-4 rounded-xl border border-border bg-muted/10 group hover:border-primary/30 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold group-hover:text-primary transition-colors">{quest.title}</h3>
                                                <p className="text-xs text-muted-foreground">{quest.desc}</p>
                                            </div>
                                            <span className="text-xs font-black text-primary">+{quest.xp} XP</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${quest.prog}%` }}></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-muted-foreground">{quest.prog}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="p-6 glass-card gradient-border text-center">
                            <h3 className="font-bold mb-2">Want a custom quest?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Tell the AI what you want to master, and it will build a quest for you.
                            </p>
                            <Link href="/companion?q=Build a quest for me to learn the React codebase" className="btn-primary w-full inline-block">
                                Generate Quest →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
