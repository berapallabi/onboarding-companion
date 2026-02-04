
import { db } from '@/db';
import { documents } from '@/db/schema';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DocsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const query = (await searchParams).q?.toLowerCase();

    let allDocs = await db.select().from(documents).orderBy(documents.category);

    if (query) {
        allDocs = allDocs.filter(doc =>
            doc.title.toLowerCase().includes(query) ||
            doc.content.toLowerCase().includes(query) ||
            doc.category?.toLowerCase().includes(query)
        );
    }

    const docsByCategory = allDocs.reduce((acc, doc) => {
        const cat = doc.category || 'general';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(doc);
        return acc;
    }, {} as Record<string, typeof allDocs>);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h1 className="text-3xl font-bold">Documentation Navigator</h1>
                </div>

                <div className="space-y-12">
                    {Object.entries(docsByCategory).map(([category, items]) => (
                        <div key={category} className="fade-in">
                            <h2 className="text-xl font-bold mb-4 uppercase tracking-widest text-primary border-b border-primary/20 pb-2">
                                {category}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {items.map((doc) => (
                                    <div key={doc.id} className="glass-card p-6 hover:border-primary/50 transition-all group">
                                        <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{doc.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                            {doc.content}
                                        </p>
                                        <Link
                                            href={`/companion?q=Tell me more about ${doc.title}`}
                                            className="text-xs font-semibold text-primary uppercase tracking-tighter hover:underline"
                                        >
                                            Explain with AI →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
