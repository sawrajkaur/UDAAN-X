import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
const taskSchema = z.object({ title: z.string().trim().min(1).max(240) });
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabase.from('tasks').select('id,title,is_done,created_at').order('created_at',{ascending:false});
  if (error) return NextResponse.json({ error: 'Could not load tasks.' }, { status: 500 });
  return NextResponse.json({ tasks: data });
}
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = taskSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Task title is required.' }, { status: 400 });
  const { data, error } = await supabase.from('tasks').insert({ title: parsed.data.title, user_id: user.id }).select().single();
  if (error) return NextResponse.json({ error: 'Could not save task.' }, { status: 500 });
  return NextResponse.json({ task: data }, { status: 201 });
}
