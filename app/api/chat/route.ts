import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { db } from '@/db';
import { documents } from '@/db/schema';
import { auth } from '@/auth';
import { ilike, or } from 'drizzle-orm';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || "";

    // "RAG Lite": Search for relevant context in the documents table
    const keywords = lastMessage.split(' ').filter((w: string) => w.length > 3);
    let contextDocs: any[] = [];

    if (keywords.length > 0) {
        contextDocs = await db.select().from(documents).where(
            or(...keywords.map((k: string) => ilike(documents.content, `%${k}%`)))
        ).limit(3);
    }

    const contextString = contextDocs.length > 0
        ? "\n\nRelevant Context from Documentation:\n" + contextDocs.map(d => `### ${d.title}\n${d.content}`).join("\n\n")
        : "";

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages,
        system: `You are a Smart Onboarding Companion for a new engineer. 
    Your goal is to help them get productive fast, understand the codebase, and find the right people. 
    Be encouraging, concise, and technical when appropriate. 
    If you don't know something, ask them to check with their onboarding buddy (Sarah Chen).${contextString}`
    });

    // @ts-expect-error SDK types mismatch
    return result.toDataStreamResponse();
}
