import Link from 'next/link';
import { ArrowRight, BrainCircuit, Globe2, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

const features = [
  { icon: BrainCircuit, title: 'Multi-model AI', text: 'A provider-independent gateway designed to route tasks to suitable AI models.' },
  { icon: Globe2, title: 'Multilingual workspace', text: 'A foundation for Punjabi, Hindi, English and additional languages.' },
  { icon: Workflow, title: 'Task workflows', text: 'Organize tasks and prepare user-approved actions in one place.' },
  { icon: ShieldCheck, title: 'Privacy by design', text: 'Server-side secrets, user-scoped data and explicit approval for sensitive actions.' },
];
export default function Home() {
  return <main className="landing">
    <nav className="nav wrap"><Link href="/" className="brand"><span className="brand-icon">✦</span><span>UDAAN <b>X</b><small>BY VYORA AI</small></span></Link><div className="navlinks"><Link href="/login">Log in</Link><Link className="button small" href="/signup">Get started <ArrowRight size={16}/></Link></div></nav>
    <section className="hero wrap"><div className="eyebrow"><span className="dot"/> ਤੁਹਾਡਾ ਬਹੁਭਾਸ਼ਾਈ AI WORKSPACE</div><h1>ਤੁਹਾਡੀ ਦੁਨੀਆ।<br/><span>ਇੱਕ ਸਮਝਦਾਰ ਸਹਾਇਕ।</span></h1><p className="hero-copy">ਸੋਚੋ, ਲਿਖੋ, ਸਿੱਖੋ ਅਤੇ ਆਪਣੇ ਕੰਮ ਸੰਭਾਲੋ—ਇੱਕ ਬਹੁਭਾਸ਼ਾਈ AI Workspace ਵਿੱਚ।</p><div className="hero-actions"><Link className="button" href="/signup">ਆਪਣਾ Workspace ਬਣਾਓ <ArrowRight size={17}/></Link><Link className="button secondary" href="/login">ਲੌਗਇਨ</Link></div><div className="hero-note">ਸ਼ੁਰੂਆਤੀ ਵਰਜਨ · AI ਸੇਵਾ ਚਾਲੂ ਕਰਨ ਲਈ API ਸੈਟਅੱਪ ਲੋੜੀਂਦਾ ਹੈ</div>
    <div className="preview"><div className="preview-top"><span>✦ UDAAN X</span><span className="live"><i/> Workspace preview</span></div><div className="preview-body"><div className="preview-greeting">Good ideas deserve<br/><em>great execution.</em></div><div className="preview-input">Ask UDAAN X to help you plan, write or explore… <span>➤</span></div><div className="preview-pills"><span>✧ Research</span><span>▤ Documents</span><span>☷ Tasks</span><span>◉ Voice</span></div></div></div></section>
    <section className="features wrap"><div className="section-head"><div className="eyebrow">UDAAN X ਦੀਆਂ ਖੂਬੀਆਂ</div><h2>ਇੱਕ ਥਾਂ, ਕਈ ਸਹੂਲਤਾਂ।</h2><p>ਸੁਰੱਖਿਆ ਅਤੇ ਭਰੋਸੇ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖ ਕੇ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ।</p></div><div className="feature-grid">{features.map(({icon:Icon,title,text})=><article className="feature" key={title}><div className="feature-icon"><Icon size={22}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <footer className="wrap footer"><span>✦ VYORA AI · UDAAN X</span><span>Starter v0.4 · AI service requires your provider setup</span></footer>
  </main>;
}
