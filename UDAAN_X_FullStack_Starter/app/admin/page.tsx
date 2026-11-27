import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
export default async function AdminPage(){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect('/login');
 const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();
 if(profile?.role!=='admin')redirect('/dashboard');
 const {count}=await supabase.from('profiles').select('*',{count:'exact',head:true});
 return <main className="dashboard"><div className="dash-wrap"><Link href="/dashboard">← Back to workspace</Link><div className="dash-heading"><div className="eyebrow">VYORA AI ADMIN</div><h1>Administration</h1><p>Restricted to accounts explicitly assigned the admin role.</p></div><div className="panel"><h2>User accounts</h2><p className="stat">{count??'—'}</p><p className="muted">Profiles count. Configure role assignment only through trusted server-side administration.</p></div></div></main>
}
