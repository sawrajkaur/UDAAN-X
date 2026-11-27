import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const idSchema = z.string().uuid();
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    if (!idSchema.safeParse(id).success) return NextResponse.json({ error: 'Invalid conversation ID.' }, { status: 400 });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations').select('id,title').eq('id', id).eq('user_id', user.id).maybeSingle();
    if (conversationError) throw conversationError;
    if (!conversation) return NextResponse.json({ error: 'Conversation not found.' }, { status: 404 });
    const { data: messages, error: messagesError } = await supabase
      .from('messages').select('role,content,created_at').eq('conversation_id', id).eq('user_id', user.id)
      .in('role', ['user', 'assistant']).order('created_at', { ascending: true }).limit(100);
    if (messagesError) throw messagesError;
    return NextResponse.json({ conversation, messages: messages ?? [] }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Conversation detail error', error);
    return NextResponse.json({ error: 'Could not load this conversation.' }, { status: 500 });
  }
}
