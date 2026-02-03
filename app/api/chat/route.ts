
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { db } from '@/db'; // Assuming we'll use DB for RAG later
import { auth } from '@/auth';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { messages } = await req.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages,
        system: `You are a Smart Onboarding Companion for a new engineer. 
    Your goal is to help them get productive fast, understand the codebase, and find the right people. 
    Be encouraging, concise, and technical when appropriate. 
    If you don't know something, ask them to check with their onboarding buddy (Sarah Chen).`
    });

    // @ts-expect-error SDK types mismatch
    return result.toDataStreamResponse();
}
