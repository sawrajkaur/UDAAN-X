import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import MemoryManager from '@/components/memory-manager';
export default async function MemoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  return <main className="dashboard"><div className="dash-wrap"><Link href="/dashboard">← ਵਰਕਸਪੇਸ ਵੱਲ ਵਾਪਸ</Link><div className="dash-heading"><div className="eyebrow">UDAAN X PERSONALIZATION</div><h1>ਮੇਰੀ AI Memory</h1><p>ਯਾਦਾਂ ਤੁਹਾਡੇ ਖਾਤੇ ਨਾਲ ਜੁੜੀਆਂ ਹਨ। ਤੁਸੀਂ ਉਨ੍ਹਾਂ ਨੂੰ ਦੇਖ ਅਤੇ ਮਿਟਾ ਸਕਦੇ ਹੋ।</p></div><MemoryManager/><p className="disclaimer">v1.0 ਵਿੱਚ Memory ਸਪਸ਼ਟ ਸਹਿਮਤੀ ਨਾਲ ਸੰਭਾਲੀ ਜਾਂਦੀ ਹੈ। ਤੁਹਾਡੀ ਸਹਿਮਤੀ ਨਾਲ ਸੰਭਾਲੀਆਂ ਯਾਦਾਂ Chat ਦੇ ਸੰਦਰਭ ਵਿੱਚ ਵਰਤੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ। ਤੁਸੀਂ ਇਨ੍ਹਾਂ ਨੂੰ ਕਿਸੇ ਵੀ ਵੇਲੇ ਮਿਟਾ ਸਕਦੇ ਹੋ।</p></div></main>;
}
