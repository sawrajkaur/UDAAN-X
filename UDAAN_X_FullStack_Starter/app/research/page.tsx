import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ResearchPanel from '@/components/research-panel';
import { ArrowLeft, Search } from 'lucide-react';

export default async function ResearchPage() {
  let user = null;
  try { const supabase = await createClient(); const { data } = await supabase.auth.getUser(); user = data.user; } catch {}
  if (!user) redirect('/login');
  return <main className="document-page"><header className="document-nav"><Link href="/dashboard" className="doc-back"><ArrowLeft size={16}/> Dashboard</Link><Link href="/" className="brand"><span className="brand-icon">✦</span><span>UDAAN <b>X</b><small>BY VYORA AI</small></span></Link></header><section className="document-wrap"><div className="eyebrow"><Search size={14}/> UDAAN X WEB RESEARCH</div><h1>ਵੈੱਬ ਤੋਂ ਖੋਜੋ, ਸਰੋਤਾਂ ਸਮੇਤ।</h1><p className="doc-intro">ਇੱਕ ਸਵਾਲ ਦਿਓ। UDAAN X ਵੈੱਬ ਸਰੋਤ ਲੱਭੇਗਾ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਹਵਾਲਿਆਂ ਸਮੇਤ ਰਿਪੋਰਟ ਤਿਆਰ ਕਰੇਗਾ।</p><ResearchPanel/></section></main>;
}
