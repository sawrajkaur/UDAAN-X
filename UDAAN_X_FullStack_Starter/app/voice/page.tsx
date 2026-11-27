import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import VoicePanel from '@/components/voice-panel';
import { ArrowLeft, Mic2 } from 'lucide-react';

export default async function VoicePage() {
  let user = null;
  try { const supabase = await createClient(); const { data } = await supabase.auth.getUser(); user = data.user; } catch {}
  if (!user) redirect('/login');
  return <main className="voice-page"><header className="document-nav"><Link href="/dashboard" className="doc-back"><ArrowLeft size={16}/> Dashboard</Link><Link href="/" className="brand"><span className="brand-icon">✦</span><span>UDAAN <b>X</b><small>BY VYORA AI</small></span></Link></header><section className="voice-wrap"><div className="eyebrow"><Mic2 size={14}/> UDAAN X VOICE</div><h1>ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਗੱਲ ਕਰੋ।</h1><p className="doc-intro">ਮਾਈਕ੍ਰੋਫੋਨ ਨਾਲ ਬੋਲੋ, AI ਦਾ ਜਵਾਬ ਲਿਖਤੀ ਰੂਪ ਵਿੱਚ ਵੇਖੋ ਅਤੇ ਉਪਲਬਧ ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ। ਭਾਸ਼ਾ ਦੀ ਉਪਲਬਧਤਾ ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਅਤੇ ਡਿਵਾਈਸ ਉੱਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।</p><VoicePanel/><p className="doc-privacy">ਗੋਪਨੀਯਤਾ: ਮਾਈਕ੍ਰੋਫੋਨ ਦੀ ਇਜਾਜ਼ਤ ਬ੍ਰਾਊਜ਼ਰ ਤੋਂ ਮੰਗੀ ਜਾਂਦੀ ਹੈ। ਇਸ ਵਰਜਨ ਵਿੱਚ Speech Recognition ਬ੍ਰਾਊਜ਼ਰ/ਡਿਵਾਈਸ ਉੱਤੇ ਚੱਲਦੀ ਹੈ। AI ਜਵਾਬ ਲਈ ਤੁਹਾਡਾ ਲਿਖਤੀ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ UDAAN X ਸਰਵਰ ਅਤੇ ਸੰਰਚਿਤ AI Provider ਨੂੰ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ। ਲਗਾਤਾਰ ਪਿਛੋਕੜ ਵਿੱਚ ਸੁਣਨ ਦੀ ਸਹੂਲਤ ਨਹੀਂ ਹੈ।</p></section></main>;
}
