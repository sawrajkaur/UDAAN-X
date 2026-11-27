import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DocumentReader from '@/components/document-reader';
export default async function DocumentsPage() {
  let user = null;
  try { const supabase = await createClient(); const { data } = await supabase.auth.getUser(); user = data.user; } catch {}
  if (!user) redirect('/login');
  return <DocumentReader />;
}
