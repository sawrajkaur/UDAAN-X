import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ChatPanel from '@/components/chat-panel';
import TaskPanel from '@/components/task-panel';
import { FileText, LogOut, Sparkles, Mic, Search, Brain } from 'lucide-react';

export default async function Dashboard() {
 let user = null;
 try { const supabase = await createClient(); const { data } = await supabase.auth.getUser(); user = data.user; } catch {}
 if (!user) redirect('/login');
 return <main className="dashboard"><header className="dash-nav"><Link href="/" className="brand"><span className="brand-icon">✦</span><span>UDAAN <b>X</b><small>BY VYORA AI</small></span></Link><div className="dash-user">{user.email}<form action="/auth/signout" method="post"><button className="icon-link" aria-label="Sign out"><LogOut size={17}/></button></form></div></header><div className="dash-wrap"><div className="dash-heading"><div className="eyebrow"><span className="dot"/> YOUR WORKSPACE</div><h1>UDAAN X ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।</h1><p>ਤੁਹਾਡਾ ਨਿੱਜੀ AI Workspace। ਪੰਜਾਬੀ, ਹਿੰਦੀ ਜਾਂ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਗੱਲਬਾਤ ਸ਼ੁਰੂ ਕਰੋ।</p></div><div className="dashboard-tools"><Link href="/voice" className="tool-link"><Mic size={18}/> Voice Assistant <span>ਦੁਨੀਆ ਦੀਆਂ ਕਈ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਬੋਲੋ →</span></Link><Link href="/documents" className="tool-link"><FileText size={18}/> PDF ਅਤੇ Document Reader <span>ਫਾਈਲ ਪੜ੍ਹੋ ਅਤੇ AI ਨੂੰ ਸਵਾਲ ਪੁੱਛੋ →</span></Link><Link href="/research" className="tool-link"><Search size={18}/> Web Research AI <span>ਵੈੱਬ ਖੋਜ ਅਤੇ ਸਰੋਤਾਂ ਸਮੇਤ ਰਿਪੋਰਟ →</span></Link><Link href="/memory" className="tool-link"><Brain size={18}/> ਮੇਰੀ AI Memory <span>ਆਪਣੀਆਂ ਮਨਜ਼ੂਰ ਕੀਤੀਆਂ ਯਾਦਾਂ ਸੰਭਾਲੋ ਅਤੇ ਮਿਟਾਓ →</span></Link></div><div className="dash-grid"><section className="panel chat-panel"><div className="panel-title"><Sparkles size={18}/> UDAAN X AI Assistant <span className="tag">AI Provider Setup</span></div><ChatPanel/></section><section className="panel"><div className="panel-title">ਮੇਰੇ ਕੰਮ</div><TaskPanel/></section></div><p className="disclaimer">ਨੋਟ: ਅਸਲੀ AI ਜਵਾਬਾਂ ਲਈ ਸਰਵਰ ਉੱਤੇ AI API Key ਅਤੇ Login/Tasks ਲਈ Supabase configuration ਲੋੜੀਂਦੀ ਹੈ। ਸੁਰੱਖਿਆ ਜਾਂਚ ਤੋਂ ਪਹਿਲਾਂ ਨਿੱਜੀ ਜਾਂ ਸੰਵੇਦਨਸ਼ੀਲ ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਨਾ ਕਰੋ।</p></div></main>
}
