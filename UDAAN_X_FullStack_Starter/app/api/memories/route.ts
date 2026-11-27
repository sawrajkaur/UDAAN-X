import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const createSchema = z.object({
  label: z.string().trim().min(1).max(80),
  content: z.string().trim().min(1).max(2000),
  consent: z.literal(true),
});

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
    const { data, error } = await supabase.from('memories').select('id,label,content,created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    return NextResponse.json({ memories: data ?? [] }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Memory list error', error);
    return NextResponse.json({ error: 'Could not load memories. Check that the v1.0 database migration has been run.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
    const parsed = createSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid memory.' }, { status: 400 });
    const { data, error } = await supabase.from('memories').insert({
      user_id: user.id,
      label: parsed.data.label,
      content: parsed.data.content,
      consented_at: new Date().toISOString(),
    }).select('id,label,content,created_at').single();
    if (error) throw error;
    return NextResponse.json({ memory: data }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Memory create error', error);
    return NextResponse.json({ error: 'Could not save this memory.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
    const body = await request.json().catch(() => ({}));
    const id = z.string().uuid().safeParse(body.id);
    if (!id.success) return NextResponse.json({ error: 'A valid memory ID is required.' }, { status: 400 });
    const { error } = await supabase.from('memories').delete().eq('id', id.data).eq('user_id', user.id);
    if (error) throw error;
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error('Memory delete error', error);
    return NextResponse.json({ error: 'Could not delete this memory.' }, { status: 500 });
  }
}
