import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });
    const { data, error } = await supabase
      .from('conversations')
      .select('id,title,created_at,updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(30);
    if (error) throw error;
    return NextResponse.json({ conversations: data ?? [] }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Conversation list error', error);
    return NextResponse.json({ error: 'Could not load conversation history.' }, { status: 500 });
  }
}
